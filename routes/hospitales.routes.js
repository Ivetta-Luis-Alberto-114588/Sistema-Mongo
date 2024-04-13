/*
    Hospitales
    ruta : '/api/hospitales'
*/


const { Router } = require('express')
const { check } = require('express-validator')
const {validarCampos} = require( '../middlewares/validar-campos' )
const { getHospitales, addHospital, updateHospital, deleteHospital} = require('../controllers/hospital.controller')

const {generarJwt} = require('../helpers/jwt.helpers')
const router = Router();


router.get( '/', getHospitales);
router.post( 
    '/', 
    [], 
    addHospital
);

router.put(
    '/:uid', 
    [    ],
    updateHospital
);

router.delete( 
    '/:uid', 
    deleteHospital
);




module.exports = router;