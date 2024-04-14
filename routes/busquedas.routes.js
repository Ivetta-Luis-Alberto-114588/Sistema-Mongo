/*
 * ruta  'api/todo'
 */

const { Router } = require('express')
const { getTodo } = require('../controllers/busquedas.controller')
const {validarJwt} = require('../middlewares/validar-jwt');




const router = Router();

router.get(
    '/:busqueda',
    [
        validarJwt
    ],
    getTodo)

module.exports = router