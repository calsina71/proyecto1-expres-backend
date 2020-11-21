const { Schema, model } = require ('mongoose');

const ProyectoSchema = Schema({

    tipoProyecto: {
        type: String,
        require: true
    },
    empresa: {
        type: String,
        required: true
    },
    cif: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    logo: {
        type: String
    },
    nombre: {
        type: String,
        required: true
    },
    apellido1: {
        type: String,
        required: true
    },
    apellido2: {
        type: String,
    },
    nif: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        default: 'Barcelona',
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
    telefono: {
        type: String,
    },
    web: {
        type: String,
    },
    
});


ProyectoSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});


module.exports = model( 'Proyecto', ProyectoSchema );