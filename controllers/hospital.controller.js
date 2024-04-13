const {response} = require('express')

const getHospitales = (req, resp = response) =>{
    resp.json({
        ok: true,
        msg: 'getHospitales'
    })
}

const addHospital = (req, resp = response) =>{
    resp.json({
        ok: true,
        msg: 'addHospitales'
    })
}
const updateHospital = (req, resp = response) =>{
    resp.json({
        ok: true,
        msg: 'updateHospital'
    })
}
const deleteHospital = (req, resp = response) =>{
    resp.json({
        ok: true,
        msg: 'deleteHospital'
    })
}


module.exports = {
    getHospitales,
    addHospital, 
    updateHospital,
    deleteHospital
}