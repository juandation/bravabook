import express from 'express';
import { connectDB } from './utils/db.js';
import { Apartment } from './models/Apartment.model.js';

// Creamos una instancia de express para definir los endpoints

const app = express();

// Poder procesar información de los formularios
app.use(express.urlencoded({extended: true}));

// endpoint HOME
app.get("/", (req, res)=>{
    res.send(`<h1>Bienvenido a BravaBook 🦜 </h1>
              <p><a href="/admin/apartment/new">Añade un apartamento ahora</a></p>`)
});

// endpoint AÑADIR APARTAMENTO - FORMULARIO
app.get("/admin/apartment/new", (req, res)=> {
    res.render("add-apartment.ejs");
});

// endpoint AÑADIR APARTMENTO - POST - INSERTAR APARTAMENTO EN LA BASE DE DATOS
app.post("/admin/apartment", async (req, res)=> {

    const { title, price, size, mainPhoto} = req.body;

    try {
        await Apartment.create({
            title: title,
            price: price,
            squareMeters: size,
            mainPhoto: mainPhoto

        });

        res.send('Apartamento insertado correctamente. <a href="/">Volver al HOME</a>');

    } catch (error) {
        res.send('Ups! Algo ha ido mal! Hemos informado a los desarrolladres. <a href="/">Volver al HOME</a>');
        console.log(error.message);
    }

});

// Levantar el servidor en el puerto 3000

// Conectarnos al a base de datos
// top-leve await
await connectDB();

app.listen(3000, ()=> {

    console.log("Escuchando peticiones en el puerto http://localhost:3000");
})