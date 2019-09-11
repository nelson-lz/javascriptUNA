require('dotenv').config();//para leer el archivo .env

const express = require("express");
const morgan = require("morgan");

//Inicializations
const app = express();
require('./database');

//Settings
app.set("port",4000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/tareas', require('./routes/tareas.routes'));//end point task
app.use('/api/users', require('./routes/users.routes'));//end point users


//Starting the server
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});