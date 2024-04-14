const {response} = require('express')
const Medico = require('../models/medico.models')

const getMedicos = (req, resp = response) =>{
    resp.json({
        ok: true,
        msg: 'getMedicos'
    })
}

const addMedico = async (req, resp = response) =>{

    //uid del usuario que creo el medico, viene del middleware
    const uid = req.uid


    //creo el medico con todos los datos necesarios
    const medico = new Medico({
        usuario : uid,
        ... req.body
    })

    try {

        const medicoDB = await medico.save()

        resp.status(200).json({
            ok: true,
            medico : medicoDB
        })

        
    } catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: "error al intentar crear medico -> " + error
        })
        
    }




}
const updateMedico = (req, resp = response) =>{
    resp.json({
        ok: true,
        msg: 'updateMedico'
    })
}
const deleteMedico = (req, resp = response) =>{
    resp.json({
        ok: true,
        msg: 'deleteMedico'
    })
}


module.exports = {
    getMedicos,
    addMedico, 
    updateMedico,
    deleteMedico
}