import mongoose from "mongoose"
import config from "./config.js"

const URI = config.mongoUrl

mongoose.connect(URI)
    .then(() => console.log("Conexion a base de datos exitosa"))
    .catch(error => console.log(error))