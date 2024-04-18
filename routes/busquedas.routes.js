/*
 * ruta  'api/todo'
 */

const { Router } = require('express')
const { getTodo, getDocumentoColeccion } = require('../controllers/busquedas.controller')
const {validarJwt} = require('../middlewares/validar-jwt');




const router = Router();

router.get('/:busqueda', [ validarJwt ], getTodo)
router.get('/coleccion/:tabla/:busqueda', [ validarJwt ], getDocumentoColeccion)

module.exports = router