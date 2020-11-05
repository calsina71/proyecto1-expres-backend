
const { rejects } = require('assert');
const jwt = require('jsonwebtoken');
const { resolve } = require('path');

const generarJWT = ( uid ) => {

    // Lo manejaremos todo dentro de una promesa, capturando si se produce un error
    // o devolviendo el token si todo funciona correctamente.
    return new Promise( ( resolve, reject ) => {

// El payload puede tener uno o más campos que queramos enviar. 
    // En éste caso, sólo enviamos el 'uid'.
    const payload = {  uid, };

    // El .sing recive 3 argumentos: El payload, la semilla o cadena secreta y información adicional
    // que suele ser la expiración del token. Seguido de una función de call-back donde recibimos el error y el token.
    jwt.sign( 
        payload,                    // payload
        process.env.JWT_SECRET,     // semilla o cadena_secret
        { expiresIn: '12h'},        // información de expiración del token
        ( err, token ) => {         // Función de call-back

            if ( err ) {
                console.log( error );
                reject( 'No se pudo generar el JWT' );
            } else {
                resolve( token );
            }

        });

    });  
    
};

module.exports = {
    generarJWT,
};
