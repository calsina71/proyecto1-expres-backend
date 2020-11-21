const express = require('express');
require('dotenv').config();
const cors = require('cors');

// import express from 'express';  <-- Es lo mismo que la línea de arriba.
let { dbConnection } = require('./database/config');

// Crear el servidor Express (servidor rest)
const app = express();


// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

// Ruta de prueba
// app.get('/', ( req, res) => {
//     res.json( {
//         ok: true,
//         msg: 'Hola Mundo!'
//     });
// });

// Rutas
app.use( '/api/servicios', require('./routes/servicios') );
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );


app.listen( process.env.PORT, () =>{
    console.log( 'Servidor corriendo en el puerto ' + process.env.PORT );
});
