/*
    path : "api/login"
*/

const {Router} = require('express')
const {login, googleSignIn, renewToken} = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJwt} = require('../middlewares/validar-jwt')

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


//para ver este token entrar a http://localhost:3000/
router.post
    (
        '/google',
        [
            check('token',"el token de google es obligatorio").not().isEmpty(),
            validarCampos
        ],
        googleSignIn
)

router.get
    (
        '/renew',
        [
            
        ],
        validarJwt,
        renewToken
)







module.exports =router