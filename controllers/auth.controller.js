const path = require('path')
const { response } = require('express')
const Usuario = require('../models/usuario.models')
const bcrypt = require('bcryptjs')
const {generarJwt} = require('../helpers/jwt.helpers')
const { googleVerify } = require('../helpers/google-verify.helpers')
const { retornaImage } = require('./uploads.controller')
const { getMenuFrontEnd } = require('../helpers/menu-frontend')

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
            role: usuarioDB.role,
            usuario: usuarioDB.nombre,
            email: usuarioDB.email,
            img: usuarioDB.img, 
            token: token,
            uid: usuarioDB._id,
            menu : getMenuFrontEnd(usuarioDB.role)
        })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: "error al hacer el login -->" + error 
        })
    }
}

/*
    esta funcion va a recibir el token de google en el req y con ese token se extrae el mail del payload
    y con ese mail se busca en nuestra BD, si se encuentra el usuario en la BD nuestra se le pone la foto 
    de google
    Si no se encuentra se crea un usuario sin contraseña en nuestra BD
*/
const googleSignIn = async (req, resp = response) => {
    //para ver el token entrar a http://localhost:3000/
    
/**
 * ESTO ES UN EJEMPLO DE LO QUE SE OBTIENE DEL PAYLOAD DE GOOGLE
 * https://developers.google.com/identity/gsi/web/reference/js-reference?hl=es-419
 */

    //     header
// {
//   "alg": "RS256",
//   "kid": "f05415b13acb9590f70df862765c655f5a7a019e", // JWT signature
//   "typ": "JWT"
// }
//          payload
// {
//   "iss": "https://accounts.google.com", // The JWT's issuer
//   "nbf":  161803398874,
//   "aud": "314159265-pi.apps.googleusercontent.com", // Your server's client ID
//   "sub": "3141592653589793238", // The unique ID of the user's Google Account
//   "hd": "gmail.com", // If present, the host domain of the user's GSuite email address
//   "email": "elisa.g.beckett@gmail.com", // The user's email address
//   "email_verified": true, // true, if Google has verified the email address
//   "azp": "314159265-pi.apps.googleusercontent.com",
//   "name": "Elisa Beckett",
//                             // If present, a URL to user's profile picture
//   "picture": "https://lh3.googleusercontent.com/a-/e2718281828459045235360uler",
//   "given_name": "Elisa",
//   "family_name": "Beckett",
//   "iat": 1596474000, // Unix timestamp of the assertion's creation time
//   "exp": 1596477600, // Unix timestamp of the assertion's expiration time
//   "jti": "abc161803398874def"
// }




    try {
        // const googleUser = await googleVerify ( req.body.token )
        //desectructuro la info del usuario, lo que voy a usar es el 
        // mail para buscar los datos en mi BD y cuando ese dato coincide devuelvo un objeto
        const {email, name, picture} = await googleVerify ( req.body.token )
        // console.log ("respuesta de google cuando se ejectua el metodo googleSignIn de authController:"
        //                 , email
        //                 , name
        //                 , picture     
        // )

        //verifico si existe el usuario
        const usuarioDB = await Usuario.findOne( { email })
        let usuario

        //  si no existe ningun usuario en mi BD con ese mail se crea uno
        // si existe un usuario en la BD le pongo las propiedades y despues le sobreescribo algunas propiedades
        // por ejemplo la img, 
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name, //asingo a la propiedad nombre el name de google
                email,
                password: '@@@', //pongo cualquier contraseña
                img: picture, //asigno a img del usuario la picture de google
                google: true
            })
        } else {
            usuario = usuarioDB;

            //ahora pongo la imagen de google en la img de mi usuario
            usuario.img = picture
            usuario.google = true;
            // console.log("como queda el usuario en el metodo googleSignIn del authController", usuario)
            //usuario.password = '@@'
        }

        //guardo el usuario en la BD
        await usuario.save();
        
        //generar el token
        const token = await generarJwt( usuario._id ) 

        // esto devuelve mi ENDPOINT email name y picture TODO DE GOOGLE y el token que acabo de generar con el payload de _id
        resp.json({
            ok: true,
            email, name, picture,
            token,menu : getMenuFrontEnd(usuario.role)

        })
        
    } catch (error) {

        console.log  ( error )
        resp.status(400).json({
            ok: false,
            msg: 'token de google no es correcto'
        })

    }
}


const renewToken = async (req, resp = response) => {
            
    const uid = req.uid

    const usuarioDB = await Usuario.findOne( {_id: uid})
   
    //generar el token
    const token = await generarJwt( uid) 


    //si el usuario no tiene imagen le pongo la imange de NO DISPONIBLE
    if( !usuarioDB.img){
        usuarioDB.img = 'no_disponible.jpg'
    }

    resp.json({
        ok: true,
        usuario: usuarioDB,
        token,
        menu : getMenuFrontEnd(usuarioDB.role)
    })
}

module.exports = {login, googleSignIn, renewToken}