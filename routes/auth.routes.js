/*
    path : "api/login"
*/

const {Router} = require('express')
const {login, googleSignIn} = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post
    (
        '/',
        [
            check('email', "el email es obligatorio").isEmail().not().isEmpty(),
            check('password',"el password es obligatorio").not().isEmpty(),
            validarCampos
        ],
        login
)


router.post
    (
        '/google',
        [
            check('token',"el token de google es obligatorio").not().isEmpty(),
            validarCampos
        ],
        googleSignIn
)






module.exports =router