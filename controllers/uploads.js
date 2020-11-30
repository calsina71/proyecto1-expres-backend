const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const pathRoot = require ('path');
const fs = require("fs");


const comprobarTipo = ( tipo, res ) => {

    const tiposValidos = ['usuarios', 'clientes', 'proyectos'];
    
    if (!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: 'El tipo debe ser un usuario, cliente o proyecto'
        });
    }
    // console.log( 'El tipo es válido: ' + tipo );
};


const ficheroSubido = ( req, res= response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    comprobarTipo( tipo, res );

    // Validar que exista un fichero
    if ( !req.files || Object.keys(req.files).length === 0 ) {
        return res.status(400).json({
            ok: false,
            msg: 'No subió ningún fichero'
        });
    }


    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');  // Ejemplo: imagen.1.2.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length -1]; 

    // Validar extensión del archivo
    const extensionesValidas = ['png','jpg','jpeg','gif','bmp'];

    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json( {
            ok: false,
            msg: `${extensionArchivo}, no es una extensión permitida`
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv( path, (err) => {
        if (err) {
            console.log( err );
            return res.status( 500 ).json( {
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // actualizar imagen en BBDD
        actualizarImagen( tipo, id, nombreArchivo );
        
        res.json({
            ok: true,
            msg: 'Fichero subido',
            nombreArchivo
        });
    });

    
};



const retornaFoto = ( req, res ) => {

    const tipo = req.params.tipo;
    const foto   = req.params.foto;

    comprobarTipo( tipo, res );

    let pathFoto = pathRoot.join( __dirname, `../uploads/${ tipo }/${ foto }`);

    // Imagen por defecto si no hay foto disponible
    if ( !fs.existsSync( pathFoto ) ) {
        pathFoto = pathRoot.join( __dirname, '../uploads/imagen-no-disponible.jpg');
    }
    
    res.sendFile( pathFoto );

};



module.exports = {
    ficheroSubido, 
    retornaFoto,
};
