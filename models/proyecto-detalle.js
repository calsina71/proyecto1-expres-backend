const { Schema, model } = require ('mongoose');

const ProyectoDetalleSchema = Schema({

    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    servicio: {
        type: Schema.Types.ObjectId,
        ref: 'Servicio'
    },
    tiempo_inicio: {
        type: Number,
    },
    tiempo_fin: {
        type: Number,
    },
    tiempo_invertido: {
        type: Number,
    },
    precio_hora: {
        type: Number,
    },
    iva: {
        type: Number,
    },
    total_precio: {
        type: Number,
    }
   
});


ProyectoDetalleSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object;
});


module.exports = model( 'ProyectoDetalle', ProyectoDetalleSchema );