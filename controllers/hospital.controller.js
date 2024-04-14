const {response} = require('express')

const Hospital = require('../models/hospital.models')


const getHospitales = (req, resp = response) =>{
    resp.json({
        ok: true,
        msg: 'getHospitales'
    })
}


const addHospital = async (req, resp = response) =>{
    
    //obtengo el uid de la persona autenticada del middleware validar.jwt.js, que lo habia agregado a la request
    const uid = req.uid
    // console.log("el uid es -> " + uid )
    
    //lo que viene en el body lo desestructuro y creo una propiedad nueva con el usuario que es el uid
    const hospital = new Hospital( {
        usuario : uid,
        ...req.body
    })
    

    try {

        //envio a la bd para guardar
        const hospitalDB = await hospital.save()

        //si todo va bien envio el json y va a figurar el uid del usuario que creo el hospital
        resp.json({
            ok: true,
            hospital: hospitalDB
        })


        
    } catch (error) {
        console.log("error de crear el hospital -> " + error)

        resp.status(500).json({
            ok: false,
            msg: "no se pudo crear el hospital -> " + error 
        })
    }   

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