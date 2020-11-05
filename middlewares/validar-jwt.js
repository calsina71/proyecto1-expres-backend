const { Console } = require('console');
const { json } = require('express');
const jwt = require('jsonwebtoken');



const validarJWT = ( req, res, next ) => {

    // Leer el Token
    const token = req.header('x-token');

    // console.log( token );
    if ( !token ) {
        return res.status( 401 ).json({
            ok:  false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;  // Podemos ñadir el uid a la request (req) para usarlo en usuarios.js
        
        next();
        
    } catch (error) {
        return res.status( 401 ).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

};

module.exports = {
    validarJWT
};