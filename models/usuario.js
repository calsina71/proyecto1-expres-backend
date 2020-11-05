const { Schema, model } = require ('mongoose');

const UsuarioSchema = Schema({

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
    dni: {
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
    perfil: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        default: 'usuario'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    stacks: {
        type: String,
    },
    telefono: {
        type: String,
    },
    webpersonal: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    google: {
        type: Boolean,
        default: false
    }

});


// Los campos "__v" y el "_id" son creados por mongodb automáticamente.
// Para suprimir el "__v" y reconvertir "_id" en "uid" : 
UsuarioSchema.method('toJSON', function() {
    
    // Separamos el __v, el _i, el password y el resto del objeto,
    // con lo cual object ya no tiene los campos __v i _id, y tampoco
    // el password (que no queremos regresarlo por tema de seguridad).
    const { __v, _id, password, ...object} = this.toObject();
    
    // Definimos el campo "uid" al objeto y le asignamos el valor de "_id" que habiamos separado.
    object.uid = _id;
    
    // Devolvemos el objeto, sin los campos __v y _id, ni el password, pero incluirá el campo uid
    // que ha tomado el valor que tenia el campo _id.
    return object;
});


module.exports = model( 'Usuario', UsuarioSchema );