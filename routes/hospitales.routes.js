/*
    Hospitales
    ruta : '/api/hospitales'
*/


const { Router } = require('express')
const { check } = require('express-validator')
const { getHospitales, addHospital, updateHospital, deleteHospital} = require('../controllers/hospital.controller')

const {validarCampos} = require( '../middlewares/validar-campos' )
const {validarJwt} = require('../middlewares/validar-jwt')

const router = Router();


router.get( '/', getHospitales);
router.post( 
    '/', 
    [
        validarJwt,
        check('nombre', "el nombre del hospital es obligatorio").not().isEmpty(),
        validarCampos
    ], 
    addHospital
);

router.put(
    '/:id', 
    [  
        validarJwt,
        check('nombre', "el nombre del hospital es obligatorio").not().isEmpty(),
        validarCampos
    ],
    updateHospital
);

router.delete( 
    '/:uid', 
    deleteHospital
);




module.exports = router;