require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const { dbConnection } = require('./database/db_connect');


// ====================================>
// MIDLEWARES
// ====================================>
// <==Morgan==>
app.use(morgan('dev'));
//  <==Parser on Body==>
app.use(express.json());
//  <==Cors==>
app.use(cors());
// ====================================>
// ROUTES
// ====================================>
// <==Rutas del Usuario==>
app.use('/api/usuarios', require('./routes/usuarios.routes'))
// <==Rutas del Auth==>
app.use('/api/login', require('./routes/auth.routes'))
// ====================================>

// ====================================>
// DATABASE CONNECT
// ====================================>
dbConnection();
// ====================================>


// Settings
app.set('port', process.env.PORT || 3000);


// ====================================>
// Starting the server
// ====================================>
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})
// ====================================>

