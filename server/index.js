const express = require("express");
const app = express();
const { client,
    createCustomer,
    createRestaurant,
    createTables,
    fetchCustomers,
    fetchRestaurants,
    createReservation,
    destroyReservation,
    fetchReservations } = require("./db");

app.use(express.json());
app.use(require("morgan")("dev"));

// Route to fetch customers
app.get('/api/customers', async (req, res, next) => {
    try {
        const customers = await fetchCustomers();
        res.json(customers);
    } catch (error) {
        next(error);
    }
});

// Route to fetch restaurants
app.get('/api/restaurants', async (req, res, next) => {
    try {
        const restaurants = await fetchRestaurants();
        res.json(restaurants);
    } catch (error) {
        next(error);
    }
});

// Route to fetch reservations
app.get('/api/reservations', async (req, res, next) => {
    try {
        const reservations = await fetchReservations();
        res.json(reservations);
    } catch (error) {
        next(error);
    }
});

// Route to create a reservation
app.post('/api/customers/:id/reservations', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { restaurant_id, date, party_count } = req.body;
        const reservation = await createReservation({ customer_id: id, restaurant_id, date, party_count });
        res.status(201).json(reservation);
    } catch (error) {
        next(error);
    }
});

// Route to delete a reservation
app.delete('/api/customers/:customer_id/reservations/:id', async (req, res, next) => {
    try {
        const { id, customer_id } = req.params;
        await destroyReservation(id, customer_id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

// BONUS BROWNIE POINTS: Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Initialize the server and database
const init = async () => {
    try {
        await client.connect();
        await createTables();
        console.log("Tables created");

        const [john, jane, alice, restaurant1, restaurant2, restaurant3] = await Promise.all([
            createCustomer("john"),
            createCustomer("jane"),
            createCustomer("alice"),
            createRestaurant("Restaurant A"),
            createRestaurant("Restaurant B"),
            createRestaurant("Restaurant C")
        ]);

        console.log("Data seeded");

        await Promise.all([
            createReservation({
                customer_id: john.id,
                restaurant_id: restaurant1.id,
                date: '2024-05-10',
                party_count: 4
            }),
            createReservation({
                customer_id: jane.id,
                restaurant_id: restaurant2.id,
                date: '2024-05-15',
                party_count: 2
            }),
            createReservation({
                customer_id: alice.id,
                restaurant_id: restaurant3.id,
                date: '2024-12-11',
                party_count: 4
            })
        ]);

        console.log("Reservations created");
        console.log(await fetchReservations());

        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Listening on port ${port}`));
    } catch (error) {
        console.error("Error initializing server:", error);
    }
};

init();
