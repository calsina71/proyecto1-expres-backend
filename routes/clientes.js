/*
    RUTA: /api/clientes
*/
const { Router } = require('express');
const { check  } = require('express-validator');
// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// Funciones del CRUD
const { getClientes, crearCliente, actualizarCliente, 
        borrarCliente } = require('../controllers/clientes');


const router = Router();

// Rutas  (la lógica se encuentra separada, en la carpeta controllers).
router.get( '/', validarJWT, getClientes );  
// validarJWT es un middleware que hace de puerta para pasar a getClientes o no.

router.post('/',
            [   
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('apellido1', 'El apellido es obligatorio').not().isEmpty(),
                check('dni'|'nif', 'El DNI es obligatorio').not().isEmpty(),
                check('tipo', 'El rol es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                validarCampos
            ] ,
            crearCliente );

router.put( '/:id',
            [
                validarJWT,
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('apellido1', 'El apellido es obligatorio').not().isEmpty(),
                check('dni', 'El DNI es obligatorio').not().isEmpty(),
                check('tipo', 'El rol es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                validarCampos
            ] , 
            actualizarCliente );

router.delete( '/:id', validarJWT, borrarCliente );


module.exports = router;