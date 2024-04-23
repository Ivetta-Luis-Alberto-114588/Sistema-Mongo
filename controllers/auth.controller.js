const { response } = require('express')
const Usuario = require('../models/usuario.models')
const bcrypt = require('bcryptjs')
const {generarJwt} = require('../helpers/jwt.helpers')
const { googleVerify } = require('../helpers/google-verify.helpers')

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

const googleSignIn = async (req, resp = response) => {
    
    try {
        // const googleUser = await googleVerify ( req.body.token )
        //desectructuro la info del usuario
        const {email, name, picture} = await googleVerify ( req.body.token )

        //verifico si existe el usuario
        const usuarioDB = await Usuario.findOne( { email })
        let usuario

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
            //usuario.password = '@@'
        }

        //guardo el usuario
        await usuario.save();
        
        //generar el token
        const token = await generarJwt( usuario._id ) 

        resp.json({
            ok: true,
            email, name, picture,
            token
        })
        
    } catch (error) {

        console.log  ( error )
        resp.status(400).json({
            ok: false,
            msg: 'token de google no es correcto'
        })

    }




}

module.exports = {login, googleSignIn}