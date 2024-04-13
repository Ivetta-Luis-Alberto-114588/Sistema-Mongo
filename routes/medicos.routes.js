/*
    Medicos
    ruta : '/api/medicos'
*/


const { Router } = require('express')
const { check } = require('express-validator')
const {validarCampos} = require( '../middlewares/validar-campos' )
const { getMedicos, addMedico, updateMedico, deleteMedico} = require('../controllers/medico.controller')

const router = Router();


router.get( '/', getMedicos);
router.post( 
    '/', 
    [], 
    addMedico
);

router.put(
    '/:uid', 
    [    ],
    updateMedico
);

router.delete( 
    '/:uid', 
    deleteMedico
);




module.exports = router;