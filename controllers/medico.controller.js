const {response} = require('express')
const Medico = require('../models/medico.models')

const getMedicos = async (req, resp = response) =>{
    
    const medicos = await Medico.find()
                            .populate('usuario', ['nombre', 'img'])
                            .populate('hospital', ['nombre', 'img'])
    
    resp.json({
        ok: true,
        medicos
    })
}

const addMedico = async (req, resp = response) =>{


    console.log (req)

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
const updateMedico = async (req, resp = response) =>{
    
    const id = req.params.id
    const uid = req.uid

    try {

        const medico = await Medico.findById ( id ) 

        if( !medico) {
            return resp.status(404).json({
                ok: false,
                msg: 'id del medico no encontrado'
            })
        }

        //preparo el medico
        const cambiosMedico = {
            ...req.body,
            usuario : uid
        } 

        const medicoActualizado  = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true})

        resp.status(200).json({
            ok: true,
            msg: 'medico actualizado',
            medico : medicoActualizado
        })
        
    } catch (error) {
        
        console.log (error)

        resp.status(500).json({
            ok: false,
            msg: 'error al actualizar medico'
        })
    }
}


const deleteMedico = async (req, resp = response) =>{
    const id = req.params.id
    
    try {
        
    const medico = await Medico.findById (id)

    if( !medico) {
        return resp.status(404).json({
            ok: false,
            msg: 'id del medico no encontrado'
        })
    }

    await Medico.findByIdAndDelete ( id)

    resp.status(200).json({
        ok: true,
        msg: 'medico borrado',
        medico: medico
    })
        
    } catch (error) {
        
        console.log (error)

        resp.status(500).json({
            ok: false,
            msg: 'error al borrar medico'
        })
    }        

}


module.exports = {
    getMedicos,
    addMedico, 
    updateMedico,
    deleteMedico
}