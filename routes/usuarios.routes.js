/*
    rutas /api/usuarios
*/

const { Router } = require('express')
const { check } = require('express-validator')
const {validarCampos} = require( '../middlewares/validar-campos' )
const { getUsuarios, addUsuario, updateUsuario} = require('../controllers/usuario.controller')

const router = Router();


router.get( '/', getUsuarios);
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
        check('nombre', "el nombre es obligatorio").not().isEmpty(),
        check('email', "el email es obligatorio").isEmail(),
        // check('role', "el rol es obligatorio").not().isEmpty(),
        validarCampos
    ],
    updateUsuario);





module.exports = router;