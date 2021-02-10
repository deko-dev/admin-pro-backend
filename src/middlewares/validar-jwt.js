const { request, response } = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validarJWT = (req = request, res = response, next) => {

    // Leer el token
    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET_KEY );
        req.uid = uid;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        })
    }

    next();
}

module.exports = {
    validarJWT
}
