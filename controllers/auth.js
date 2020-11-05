
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async( req, res = response ) => {

    
    const { email, password } = req.body;
    
    try {
        // verificar email
        const usuarioDB = await Usuario.findOne({ email });
    
        if( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'email no válido',
            });
        }
    
        // verificar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'password incorrecto',
            });
        } 
    
        // Generar el TOKEN - JWT   
        // Como que generarJWT retorna una promesa, podemos usar el await para esperar a tener el token.
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        });
    
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }    

};

module.exports = { 
    login 
};
