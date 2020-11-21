const { Schema, model } = require ('mongoose');

const ClienteSchema = Schema({

    tipocliente: {
        type: String,
        require: true
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
    dnicif: {
        type: String,
        required: true,
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
    foto: {
        type: String,
    },
    telefono: {
        type: String,
    },
    web: {
        type: String,
    },
    
});


ClienteSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});


module.exports = model( 'Cliente', ClienteSchema );