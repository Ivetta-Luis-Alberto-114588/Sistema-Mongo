const {response} = require('express')
const Usuario = require("../models/usuario.models")


const validarMismo_Usuario = async (req, resp = response, next) =>{

    const uid = req.uid // este es el uid que viene en el cuerpo del jwt
    const id = req.params.uid //este el id que quiero actualizar

    try {
        
        const usuarioDB = await Usuario.findById(uid)

        if(!usuarioDB){
            return resp.status(404).json({
                ok: false,
                msg: "usuario no existe"
            })
        }

        //si es un usuario administrador o es el mismo id entonces no tiene permisos
        if(usuarioDB.role === 'ADMIN_ROLE' || uid === id){
           
            next()

        } else {
            return resp.status(403).json({
                ok: false,
                msg: "no tiene autorizacion para hacer la tarea"
            })
        }

        
        
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: "no se pudo validar role -> " + error
        })
    }


}


module.exports = {
    validarMismo_Usuario
}