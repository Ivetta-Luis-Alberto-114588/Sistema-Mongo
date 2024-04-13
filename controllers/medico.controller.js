const {response} = require('express')

const getMedicos = (req, resp = response) =>{
    resp.json({
        ok: true,
        msg: 'getMedicos'
    })
}

const addMedico = (req, resp = response) =>{
    resp.json({
        ok: true,
        msg: 'addMedico'
    })
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