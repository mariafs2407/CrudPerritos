const { Schema, model} = require("mongoose");

const moviesShew = new Schema({
    nombre: String,
    raza: String,
    color: String,
    edad: String,
    fechaing: String

},{
    timestamos: true,
    versionKey: false,
});

module.exports = model("Perritos", moviesShew)