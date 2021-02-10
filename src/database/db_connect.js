const mongoose = require('mongoose');
require('dotenv').config();

const URL_CONNECTION = process.env.DB_CNN_LOCAL

const dbConnection = async() => {
    try {
        await mongoose.connect( URL_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true } )
        console.log("Database connect successful!!!");
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la BD')
    }
}

module.exports = {
    dbConnection
};