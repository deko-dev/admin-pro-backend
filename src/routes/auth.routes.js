/**
 * Rutas del Usuario
 * @path /api/login
 */
const { Router } = require("express");
const { check } = require("express-validator");
const Auth_Controller = require("../controllers/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();


router.post('/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El Password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    Auth_Controller.login
)


module.exports = router;