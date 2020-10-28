const mongoose = require('mongoose');  
// import mongoose from 'mongoose'; <-- Es lo mismo que la línea de arriba.

dbConnection = async () => {

    try {

        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la conexión a la BBDD. Ver logs.');
    }

}

module.exports = {dbConnection};
