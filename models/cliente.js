const { Schema, model } = require ('mongoose');

const ClienteSchema = Schema({

    tipo: {
        type: String,
        default: 'empresa'
    },
    nombreComercial: {
        type: String
    },
    nifCif: {
        type: String,
        required: true
    },
    razonSocial: {
        type: String,
        required: true
    },
    personaContacto : {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        String,
        required: true
    },
    web: {
        type: String
    },
    logo: {
        type: String
    },
    direccion: {
        type: String
    },
    poblacion: {
        type: String,
        default: 'Barcelona'
    },
    provincia: {
        type: String,
        default: 'Barcelona'
    },
    pais: {
        type: String,
        default: 'España'
    }
    
});


module.exports = model( 'Cliente', ClienteSchema );