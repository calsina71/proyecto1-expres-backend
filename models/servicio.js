const { Schema, model } = require ('mongoose');

const ServicioSchema = Schema({

    tipo:{
        type : String,
    },
    nombre: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    precio_unidad: {
        type: Number,
    },
    tipo_unidad: {
        type: String,
    },
    iva: {
        type: Number,
    }
});


ServicioSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});


module.exports = model( 'Servicio', ServicioSchema );