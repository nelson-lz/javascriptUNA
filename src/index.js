const express = require("express");
const morgan = require("morgan");

//Inicializations
const app = express();

//Settings
app.set("port",4000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/tareas', require('./routes/tareas.routes'));//end point task


//Starting the server
app.listen(app.get("port"), () => {
    console.log("Server on port", app.get("port"));
});