import {connect} from "mongoose";

export async function connectDB() {
    await connect("mongodb+srv://oscar:oscar@cluster0.c8tq0vp.mongodb.net/bravabook");
    console.log("Conectado a la base de datos correctamente.")
}
