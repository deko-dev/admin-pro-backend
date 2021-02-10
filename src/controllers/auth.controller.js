const { request, response } = require("express");
const bcrypt = require('bcryptjs');
const usuarioModel = require("../models/usuario.model");
const { generarJWT } = require("../helpers/jwt");

const Auth_Controller = {};

Auth_Controller.login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {
        
        const usuarioDB = await usuarioModel.findOne({ email });

        if (!usuarioDB) {
            res.status(400).json({
                ok: false,
                msg: 'No existe Usuario con este email'
            })
        }

        // Verificar Contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword) {
            res.status(400).json({
                ok: false,
                msg: 'Contraseña Invalida'
            })
        }

        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... resivar Logs'
        })
    }
}

module.exports = Auth_Controller;