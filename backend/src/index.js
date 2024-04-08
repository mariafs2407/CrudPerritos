const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

//DB
require("dotenv").config();//ni bien inicialize la api , se cargen todas las variables de entorno
require("./database");

//variable para tener acceso dentro de cualquier sitio
app.set("port", process.env.PORT || 5000);

//Configuraciones
app.use(morgan("dev")); //nos muestra informacion necesaria simplificada
app.use(express.json()); //express que use json
app.use(cors());

//EndPoints
app.use(require("./routes"));

//Server
app.listen(app.get("port"), () => {
    console.log(`Server running at port ${app.get("port")}`);
});

