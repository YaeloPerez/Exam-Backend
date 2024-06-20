const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

//Create express server
const app = express();
const server = require('http').createServer(app);

//database
dbConnection();

// public directory
app.use(express.static('public'))

// CORS
app.use(cors());

//reading and parsing the body
app.use(express.json());

/*
    Routes
*/

//-------------------------- Users -----------------------------
app.use('/api/users', require('./routes/Users/users'))

//-------------------------- Employees -----------------------------
app.use('/api/employees', require('./routes/Employees/employees'))

app.use((req, res, next) => {

    res.status(404).json({

        ok: false,
        msg: "not found",
        data: null
    })

})

//request listen for Express, Node.Js

server.listen(process.env.PORT, function () {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});
