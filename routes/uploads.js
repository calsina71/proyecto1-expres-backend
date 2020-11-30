/*
    RUTA: /api/uploads
*/

const { Router } = require('express');
const fileUpload = require('express-fileupload');

// Middlewares
const { validarJWT } = require('../middlewares/validar-jwt');
// Funciones
const { ficheroSubido, retornaFoto } = require('../controllers/uploads');

const router = Router();


router.use( fileUpload() );
// Rutas  (la lógica se encuentra separada, en la carpeta controllers).
router.put( '/:tipo/:id', validarJWT, ficheroSubido );  
router.get( '/:tipo/:foto', validarJWT, retornaFoto );  


module.exports = router;