# acme_reservation_planner
Block 34: Join Tables Part 1

The Acme Reservation Planner
Welcome to the Acme Reservation Planner workshop! In this workshop, you'll be building a RESTful API using Node.js and Express. This API will interact with a PostgreSQL database through exported methods from another file, which we'll refer to as the data layer.

Project Setup
Create a New Repository: Start by creating a new repository named the_acme_reservation_planner.
Folder Structure:
Inside the repository, create a folder named server.
Inside the server folder, add two files:
index.js: This file will contain your Express application and setup functions (similar to the init function in the guided practice).
db.js: This file will serve as your data layer.
Data Layer (server/db.js)
Your data layer (db.js) will contain methods to interact with the PostgreSQL database. Here's what you need to implement:

client: A node pg client.
createTables: Method to drop and create tables for your application.
createCustomer: Creates a customer in the database and returns the created record.
createRestaurant: Creates a restaurant in the database and returns the created record.
fetchCustomers: Returns an array of customers in the database.
fetchRestaurants: Returns an array of restaurants in the database.
createReservation: Creates a reservation in the database and returns the created record.
destroyReservation: Deletes a reservation in the database.
Express Application (server/index.js)
Your Express application (index.js) will define the RESTful routes to interact with the API. Here are the routes you need to implement:

GET /api/customers: Returns an array of customers.
GET /api/restaurants: Returns an array of restaurants.
GET /api/reservations: Returns an array of reservations.
POST /api/customers/:id/reservations: Creates a reservation. Payload should include a valid restaurant_id, date, and party_count. Returns the created reservation with a status code of 201.
DELETE /api/customers/:customer_id/reservations/:id: Deletes a reservation. Requires the id of the reservation to delete, and the customer_id passed in the URL. Returns nothing with a status code of 204.
Extra:
Add an error handling route that returns an object with an error property.

Database Schema
Below is the database schema for your reference:

Customer

id (UUID)
name (STRING)
Restaurant

id (UUID)
name (STRING)
Reservation

id (UUID)
date (DATE NOT NULL)
party_count (INTEGER NOT NULL)
restaurant_id (UUID REFERENCES restaurants table NOT NULL)
customer_id (UUID REFERENCES customer table NOT NULL)
