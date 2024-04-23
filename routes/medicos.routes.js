/*
    Medicos
    ruta : '/api/medicos'
*/


const { Router } = require('express')
const { check } = require('express-validator')
const {validarCampos} = require( '../middlewares/validar-campos' )
const { getMedicos, addMedico, updateMedico, deleteMedico} = require('../controllers/medico.controller')

const {validarJwt} = require('../middlewares/validar-jwt')

const router = Router();


router.get( '/', getMedicos);
router.post( 
    '/', 
    [
        validarJwt,
        check('nombre', "el nombre es requerido").not().isEmpty(),

        //aca es para validar que el uid sea del tipo mongo
        check('hospital', "el uid del hospital debe ser valido").isMongoId(),
        validarCampos
    ], 
    addMedico
);

router.put(
    '/:id', 
    [
        validarJwt,
        check('nombre', "el nombre es requerido").not().isEmpty(),

        //aca es para validar que el uid sea del tipo mongo
        check('hospital', "el uid del hospital debe ser valido").isMongoId(),
        validarCampos
    ],
    updateMedico
);

router.delete( 
    '/:id', 
    [validarJwt],
    deleteMedico
);




module.exports = router;