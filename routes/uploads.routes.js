/*
 * ruta  'api/uploads'
 */

const { Router } = require('express')
const {validarJwt} = require('../middlewares/validar-jwt');
const {fileUpload} = require('../controllers/uploads.controller')

//importo la libreria instalada
const expressFileUpload = require('express-fileupload');

const router = Router();

//pongo un middlewere para subir los archivos, fijarse que no se usa el app, sino el router
router.use(expressFileUpload())

router.put('/:tipo/:id', [ validarJwt ], fileUpload)

module.exports = router