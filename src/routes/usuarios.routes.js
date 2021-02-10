/**
 * Rutas del Usuario
 * @path /api/usuarios
 */

const { Router } = require("express");
const Users_Controller = require("../controllers/usuarios.controller");
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

/**
 * @GET Obtener todos los usuarios
 */
router.get('/', validarJWT, Users_Controller.getUsuarios);

/**
 * @POST guardar usuario
 */
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    Users_Controller.crearUsuario);

router.put('/:id', validarJWT, Users_Controller.editarUsuario)

router.delete('/:id', validarJWT, Users_Controller.desactivarUsuario);

module.exports = router;