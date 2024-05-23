/*
    rutas /api/usuarios
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { getUsuarios, addUsuario, updateUsuario, deleteUsuario} = require('../controllers/usuario.controller')

const {validarJwt} = require('../middlewares/validar-jwt')
const {validarCampos} = require( '../middlewares/validar-campos' )
const {validarAdmin_Role} = require("../middlewares/validarAdminRole")
const {validarMismo_Usuario} = require("../middlewares/validarMismoUsuario")

const router = Router();


router.get( 
    '/',
    [
        validarJwt
    ],
    getUsuarios);

router.post( 
    '/', 
    [
        check('nombre', "el nombre es obligatorio").not().isEmpty(),
        check('password', "el password es obligatorio").not().isEmpty(),
        check('email', "el email es obligatorio").isEmail(),
        validarCampos
    ], 
    addUsuario);

router.put(
    '/:uid', 
    [
        validarJwt,
        validarMismo_Usuario,
        check('nombre', "el nombre es obligatorio").not().isEmpty(),
        check('email', "el email es obligatorio").isEmail(),
        // check('role', "el rol es obligatorio").not().isEmpty(),
        validarCampos
    ],
    updateUsuario);

router.delete( '/:uid', [validarJwt, validarAdmin_Role], deleteUsuario );




module.exports = router;