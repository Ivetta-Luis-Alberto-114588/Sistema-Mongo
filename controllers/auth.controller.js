const { response } = require('express')
const Usuario = require('../models/usuario.models')
const bcrypt = require('bcryptjs')
const {generarJwt} = require('../helpers/jwt.helpers')

const login = async (req, resp = response) =>{
    
    const {password, email} = req.body
    
    try {

        const usuarioDB = await Usuario.findOne( {email} )
            
        //validacion de mail
        if(!usuarioDB){
            return resp.status(404).json({
                ok: false,
                msg: "no se encontro un usuario para ese mail"
            })
        }

        //validacion de usuario
        const passwordValid = bcrypt.compareSync(password, usuarioDB.password)

        if(!passwordValid){
            return resp.status(404).json({
                ok: false,
                msg: "la contraseña no coincide para el usuario especificado"
            })
        }

        //generar el token
        const token = await generarJwt( usuarioDB._id ) 


        //estructuro lo que quiero devolver
        resp.status(200).json({
            ok: true,
            msg: "login ok",
            token: token,
            uid: usuarioDB._id
        })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: "error al hacer el login -->" + error 
        })
    }
}

module.exports = {login}