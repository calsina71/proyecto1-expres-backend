
const fs  = require('fs');

const Usuario = require('../models/usuario');
const Cliente = require('../models/cliente');
const Proyecto = require('../models/proyecto');


const borrarImagen = ( pathViejo ) => {
    if ( fs.existsSync( pathViejo ) ) {
        // Borrar la imagen anterior
        fs.unlinkSync( pathViejo );
    }

};

const actualizarImagen = async( tipo, id, nombreArchivo ) => {
    let pathViejo = '';

    switch( tipo ) {
        case 'usuarios':
            const cliente = await Cliente.findById(id);
            if ( !cliente ) {
                console.log('No es un id de cliente');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ cliente.foto }`;
            borrarImagen( pathViejo );

            cliente.foto = nombreArchivo;
            await cliente.save();
            return true;
        // break;

        case 'clientes':
            const proyecto = await Proyecto.findById(id);
            if ( !proyecto ) {
                console.log('No es un id de proyecto');
                return false;
            }

            pathViejo = `./uploads/proyectos/${ proyecto.foto }`;
            borrarImagen( pathViejo );

            proyecto.foto = nombreArchivo;
            await proyecto.save();
            return true;
        // break;

        case 'proyecto':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un id de usuario');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.foto }`;
            borrarImagen( pathViejo );

            usuario.foto = nombreArchivo;
            await usuario.save();
            return true;
        // break;

    }
    
};

module.exports = {
    actualizarImagen
};