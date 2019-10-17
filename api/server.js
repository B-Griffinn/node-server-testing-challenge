// Imports 
const express = require('express');

// Create our server
const server = express();

// Parse our server
server.use(express.json()); 

// Creating my own users for testing practice
    // alternatice is to import sb.config and pull users table from db > then run tests
let userArr = [
    { name: "Ben" },
    { name: "Rockey" },
    { name: "Kyle" },
];

// Endpoint for our api: up
server.get('/', (req, res) => {
    res.status(200).json({ api: "up" });
});

server.get("/users", (req, res) => {
    res.status(200).json(userArr); // << returns a list of users we created instead of a DB 
});

// ADD to users lsit
server.post('/users', (req, res) => {
    const body = req.body;

    if(body.name) {
        // push the new user to our array
        userArr.push(body);
        res.status(201).json({ message: "User added successfully ", user: body });
    } else {
        res.status(401).json({ message: "Please add a user with a name." })
    }
});

// Delete a user from our array
server.delete('/users', (req, res) => {
    const body = req.body;

    if(body.name) {
        // filter through the arr and del that user only
        userArr = userArr.filter(del => del.name !== body.name);
        res.status(201).json({ message: "User deleted ", user: body })
    } else {
        res.status(401).json({ message: "There is nothing to delete." })
    }
})

// Export
module.exports = server;
