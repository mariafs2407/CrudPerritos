
const mongoose = require("mongoose");

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then((db) => console.log("DB IS connected"))
  .catch((error) => console.log(error));




