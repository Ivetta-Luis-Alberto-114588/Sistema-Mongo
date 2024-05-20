const {response} = require('express')

const Hospital = require('../models/hospital.models')


const getHospitales = async (req, resp = response) =>{
    
    const hospitales = await Hospital.find().populate('usuario', ['nombre', 'img'])
    resp.json({
        ok: true,
        hospitales
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


const updateHospital = async (req, resp = response) =>{
    
    const id = req.params.id
    const uid = req.uid



    try {

        const hospital = await Hospital.findById( id )

        if ( !hospital){
            return resp.status(404).json({
                ok: false,
                msg: 'no existe ese uid en los hospitales'
            })
        }

        //actualizar tradicional
        // hospital.nombre = req.body.nombre

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, {new: true}  )

        hospital.save() 

        resp.status(200).json({
            ok: true,
            msg: 'updateHospital',
            hospital: hospitalActualizado
        })
        
    } catch (error) {

        console.log(error)

        resp.status(500).json({
            ok: false,
            msg: 'error al actualizar hospital' + error
        })
    }

    

}


const deleteHospital = async (req, resp = response) =>{
    
    const id = req.params.id

    try {

        const hospital = await Hospital.findById ( id )

        if ( !hospital ) {
            return resp.status(404).json({
                ok: false,
                msg: 'no se pudo eliminar el hospital porque no existe el uid'
            })
        }

        await Hospital.findByIdAndDelete( id )        


        resp.status(200).json({
            ok: true,
            msg: 'hospital borrado'
        })
        
    } catch (error) {
        console.log(error)
        
        resp.status(500).json({
            ok: false,
            msg: 'no se pudo eliminar el hospital'
        })
        
    }


}


module.exports = {
    getHospitales,
    addHospital, 
    updateHospital,
    deleteHospital
}