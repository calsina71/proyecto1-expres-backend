/*
    RUTA: /api/usuarios
*/
const { Router } = require('express');
const { check  } = require('express-validator');
// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
// Funciones del CRUD
const { getUsuarios, crearUsuario, actualizarUsuario, 
        borrarUsuario } = require('../controllers/usuarios');


const router = Router();

// Rutas  (la lógica se encuentra separada, en la carpeta controllers).
router.get( '/', validarJWT, getUsuarios );  
// validarJWT es un middleware que hace de puerta para pasar a getUsuarios o no.

router.post('/',
            [   
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('apellido1', 'El apellido es obligatorio').not().isEmpty(),
                check('dni', 'El DNI es obligatorio').not().isEmpty(),
                check('password', 'El password es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                validarCampos
            ] ,
            crearUsuario );

router.put( '/:id',
            [
                validarJWT,
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('apellido1', 'El apellido es obligatorio').not().isEmpty(),
                check('dni', 'El DNI es obligatorio').not().isEmpty(),
                check('rol', 'El rol es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').isEmail(),
                validarCampos
            ] , 
            actualizarUsuario );

router.delete( '/:id', validarJWT, borrarUsuario );


module.exports = router;