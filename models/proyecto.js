const { Schema, model } = require ('mongoose');

const ProyectoSchema = Schema({

    tipo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    dominio: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    requerimientos: {
        type: String,
    },
    nifcif: {
        type: String,
        required: true,
    },
    empresa: {
        type: String,
        required: true
    },
    poblacion: {
        type: String,
        default: 'Barcelona',
    },
    provincia: {
        type: String,
        default: 'Barcelona',
    },
    pais: {
        type: String,
        default: 'España',
    },
    stacks: {
        type: String,
    }

});

module.exports = model( 'Proyecto', ProyectoSchema );