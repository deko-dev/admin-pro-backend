/**
 * Controlador del Usuario
 */

const { response, request } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario.model");
const { generarJWT } = require("../helpers/jwt");

const Users_Controllers = {};

Users_Controllers.getUsuarios = async (req, res) => {
    
    const usuarios = await Usuario.find();

    res.json({
        ok: 1,
        usuarios,
        uid: req.uid
    })
}

Users_Controllers.crearUsuario = async (req, res = response) => {
    const { password, email } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ) {
            res.status(400).json({
                ok: false,
                msg: 'Email ya existe registrado a otro usuario'
            })
        }
        // Crear usuario
        const newUsuario = await new Usuario( req.body );
        
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newUsuario.password = bcrypt.hashSync( password, salt );

        // Guardar usuario
        newUsuario.save();

        const token = await generarJWT( newUsuario.id );
    
        res.status(200).json({
            ok: 1,
            newUsuario,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... resivar Logs'
        })
    }
}

Users_Controllers.editarUsuario = async (req = request, res = response) => {
    const uid = req.params.id;
    const { email, password, google, ...campos } = req.body;
    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            res.status(404).json({
                ok: true,
                msg: 'No existe un usuario por ese id'
            })
        }

        if( usuarioDB.email !== email ){

            const existeEmail = await Usuario.findOne({ email });

            if( existeEmail ) {
                res.status(400).json({
                    ok: 1,
                    msg: 'Email ya existe registrado a otro usuario'
                })
            }
        }
        campos.email = email;
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});

        res.status(200).json({
            ok: true,
            usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... resivar Logs'
        })
    }
}


Users_Controllers.desactivarUsuario = async (req = request, res = response) => {
    const uid = req.params.id
    try {
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            res.status(404).json({
                ok: true,
                msg: 'No existe un usuario por ese id'
            })
        }

        await Usuario.findByIdAndDelete( uid );

        res.status(200).json({
            ok: true,
            msg: "Usuario borrado exitosamente"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... resivar Logs'
        })
    }
}


module.exports = Users_Controllers;