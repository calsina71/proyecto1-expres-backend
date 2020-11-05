/*============================================================ 
======================= CRUD DE USUARIOS =====================
============================================================*/

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


/*====================== LISTAR USUARIOS =====================*/

const getUsuarios = async( req, res) => {
    
    const usuarios = await Usuario.find({}, 'dni nombre apellido apellido email');

    res.json( {
        ok: true,
        usuarios,      // Es equivalente a poner =  usuario: usuario
        //uid_peticion: req.uid   // el req.uid es el que se ha enviado desde el middleware validar-jwt.
    } );

};

/*======================= CREAR USUARIO =====================*/

const crearUsuario = async( req, res ) => {

    const { nombre, apellido1, dni, email, password } = req.body;

        
    try {

        // Controlamos si el email ya existe ya que debe ser único.
        const existeEmail = await Usuario.findOne({email});

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }
                
        
        const usuario = new Usuario( req.body ); 
        // console.log( 'Usuario guardado', usuario);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();  // salt es una secuencia aleatoria 
                                            // para hacer la encriptación.
        console.log(salt);
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar el TOKEN -JWT
        const token = await generarJWT( usuario._id );
        
        res.json( {
            ok: true,
            usuario,       // Es equivalente a poner =  usuario: usuario
            token
        } );

    } catch (error) {

        console.log( error );
        res.status(500).json( {
            ok: false,
            msg: 'Error inesperado... revisar logs'     
        } );
    }

};

/*======================= ACTUALIZAR USUARIO =====================*/

const actualizarUsuario = async( req, res ) => {

    // Validar token y comprobar si es el usuario correcto.
    //const { nombre, apellido1, dni, email, password } = req.body;

        
    try {

        const uid = req.params.id;


        // Controlamos si el email ya existe ya que debe ser único.
        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id.'
            });
        }

        // Actualizaciones
        const { google, password, email, ...campos } = req.body;
        // ------ Otra manera sería -------------
        // const { email, ...campos } = req.body;
        // delete campos.google;    // Eliminamos los campos que no queremos se se actualizen.
        // delete campos.password;

        // Comprobamos, si se ha cambiado el email, este no debe coincidir con ninguno que esté ya registrado ( dado que es un campo unique ).
        if ( usuarioDB.email !== email ) {
            
            const existeEmail = await Usuario.findOne({email});

            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;   // Añadimos de nuevo el email, ya sea actualizado o no.
        // --- El { new: true } nos recresará el usuario actualizado. Por defecto, si no ponemos este último parámetro, devuelve el usuario antes de ser actualizado. ----
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json( {
            ok: true,
            usuario: usuarioActualizado,
        } );

    } catch (error) {

        console.log( error );
        res.status(500).json( {
            ok: false,
            msg: 'Error inesperado... revisar logs'     
        } );
    }

};

/*======================= BORRAR USUARIO =====================*/

const borrarUsuario = async( req, res ) => {

    try {

        const uid = req.params.id;

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {

            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el id: ${ uid }`
            });
        }

        const usuarioBorrado = await Usuario.findByIdAndDelete( uid );
    
        res.json({
            ok: true,
            msg: `El usuario con id: ${ uid } ha sido borrado`,
            usuario: usuarioBorrado
        });
        
    } catch (error) {
        
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }

};


module.exports = { 
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
};