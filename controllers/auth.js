
const { response } = require('express'); // Sólo para tener las ayudas del response

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
                msg: 'email y/o password incorrecto',
            });
        }
    
        // verificar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );

        if( !validPassword ) {
            return res.status(404).json({
                ok: false,
                msg: 'email y/o password incorrecto',
            });
        } 
    
        // Generar el TOKEN - JWT   
        // Como que generarJWT retorna una promesa, podemos usar el await para esperar a tener el token.
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            msg: 'Bienvenido',
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


const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    // Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );


    res.json({
        ok: true,
        token,
        usuario,
        // menu: getMenuFrontEnd( usuario.role )
    });

}

module.exports = { 
    login,
    renewToken
};
