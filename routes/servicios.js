/*
    RUTA: /api/servicios
*/
const { Router } = require('express');
const { check  } = require('express-validator');
// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// Funciones del CRUD Servicios
const { getServicios, crearServicio, actualizarServicio, 
        borrarServicio } = require('../controllers/servicios');


const router = Router();

// Rutas  (la lógica se encuentra separada, en la carpeta controllers).
// router.get( '/', validarJWT, getServicios );
router.get( '/', getServicios );
// validarJWT es un middleware que hace de puerta para pasar a getServicios o no.

router.post('/',
            [   
                check('tipo', 'El tipo de servicio es obligatorio').not().isEmpty(),
                check('nombre', 'El nombre del servicio es obligatorio').not().isEmpty(),
                check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
                check('precio_unidad', 'El precio por unidad es obligatorio').not().isEmpty(),
                check('tipo_unidad', 'El tipo de unidad es obligatorio').not().isEmpty(),
                validarCampos
            ] ,
            crearServicio );

router.put( '/:id',
            [
                // validarJWT,
                check('tipo', 'El tipo de servicio es obligatorio').not().isEmpty(),
                check('nombre', 'El nombre del servicio es obligatorio').not().isEmpty(),
                check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
                check('precio_unidad', 'El precio por unidad es obligatorio').not().isEmpty(),
                check('tipo_unidad', 'El tipo de unidad es obligatorio').not().isEmpty(),
                validarCampos
            ] , 
            actualizarServicio );

// router.delete( '/:id', validarJWT, borrarServicio );
router.delete( '/:id', borrarServicio );


module.exports = router;