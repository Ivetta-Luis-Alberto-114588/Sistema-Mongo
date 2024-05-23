const {response} = require('express')
const Usuario = require("../models/usuario.models")



const validarAdmin_Role = async (req, resp = response, next) =>{

    const uid = req.uid
    
    try {
        
        const usuarioDB = await Usuario.findById(uid)

        if(!usuarioDB){
            return resp.status(404).json({
                ok: false,
                msg: "usuario no existe"
            })
        }

        if(usuarioDB.role !== 'ADMIN_ROLE'){
            return resp.status(403).json({
                ok: false,
                msg: "no tiene autorizacion para hacer la tarea"
            })
        }

        next()
        
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: "no se pudo validar role -> " + error
        })
    }


}


module.exports = {
    validarAdmin_Role
}