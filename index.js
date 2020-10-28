const express = require('express');
require('dotenv').config();
const cors = require('cors');

// import express from 'express';  <-- Es lo mismo que la línea de arriba.
let { dbConnection } = require('./database/config');


// Crear el servidor Express (servidor rest)
const app = express();

// Configurar CORS
app.use(cors());

// Base de datos
dbConnection();

// Rutas
app.get('/', ( req, res) => {
    res.json( {
        ok: true,
        msg: 'Hola Mundo!'
    });
});

app.listen( process.env.PORT, () =>{
    console.log( 'Servidor corriendo en el puerto ' + process.env.PORT );
});
