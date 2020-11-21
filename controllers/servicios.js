/*============================================================ 
======================= CRUD DE SERVICIOS =====================
============================================================*/

const Servicio = require('../models/servicio');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


/*====================== LISTAR SERVICIO  =====================*/

const getServicios = async( req, res) => {
    
    const servicios = await Servicio.find({}, 'tipo nombre descripcion precio_unidad tipo_unidad iva');

    res.json( {
        ok: true,
        servicios,      // Es equivalente a poner =  usuario: usuario
        //uid_peticion: req.uid   // el req.uid es el que se ha enviado desde el middleware validar-jwt.
    } );

};

/*======================= CREAR SERVICIO =====================*/

const crearServicio = async( req, res ) => {

    const { nombre, ...servicio } = req.body;

        
    try {

        // Controlamos si el email ya existe ya que debe ser único.
        const existeServicio = await Servicio.findOne({nombre});

        if ( existeServicio ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un servicio con este nombre.'
            });
        }
                
        
        const servicio = new Servicio( req.body ); 
        
        await servicio.save();

        res.json( {
            ok: true,
            servicio
        } );

    } catch (error) {

        console.log( error );
        res.status(500).json( {
            ok: false,
            msg: 'Error inesperado... revisar logs'     
        } );
    }

};

/*======================= ACTUALIZAR SERVICIO =====================*/

const actualizarServicio = async( req, res ) => {

    try {

        const id = req.params.id;


        // Controlamos si el email ya existe ya que debe ser único.
        const servicioDB = await Servicio.findById( id );

        if ( !servicioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un servicio por ese id.'
            });
        }

        // Actualizaciones
        const { nombre, ...campos } = req.body;
        
        // ------ Otra manera sería -------------
        if ( servicioDB.nombre !== nombre ) {
            
            const existeNombre = await Servicio.findOne({nombre});

            if ( existeNombre ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un servicio con ese nombre'
                });
            }
        }

        campos.nombre = nombre;   // Añadimos de nuevo el email, ya sea actualizado o no.
        // --- El { new: true } nos recresará el usuario actualizado. Por defecto, si no ponemos este último parámetro, devuelve el usuario antes de ser actualizado. ----
        const servicioActualizado = await Servicio.findByIdAndUpdate( id, campos, { new: true } );

        res.json( {
            ok: true,
            servicio: servicioActualizado,
        } );

    } catch (error) {

        console.log( error );
        res.status(500).json( {
            ok: false,
            msg: 'Error inesperado... revisar logs'     
        } );
    }

};

/*======================= BORRAR SERVICIO =====================*/

const borrarServicio = async( req, res ) => {

    try {

        const id = req.params.id;

        const servcioDB = await Servicio.findById( id );

        if ( !servicioDB ) {

            return res.status(400).json({
                ok: false,
                msg: `No existe un servicio con el id: ${ id }`
            });
        }

        const servicioBorrado = await Servicio.findByIdAndDelete( id );
    
        res.json({
            ok: true,
            msg: `El servicio con id: ${ id } ha sido borrado`,
            servicio: servicioBorrado
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
    getServicios,
    crearServicio,
    actualizarServicio,
    borrarServicio
};