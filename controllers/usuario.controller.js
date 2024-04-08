const {response} = require('express')
const IUsuario = require('../models/usuario.models')
const bcryptjs = require('bcryptjs')


const getUsuarios = async (req, resp)=> {
    
    const usuarios = await IUsuario.find( {}, 'nombre email password role ' )
    console.log ("lista de usuarios: " + usuarios)
    
    resp.status(200).json({
        ok: true,
        usuarios
    });
} 


const addUsuario = async (req, resp = response)=> {

    const {password, email, nombre} = req.body
        

    try {

        const existeEmail = await IUsuario.findOne( {email})

        if( existeEmail){
            return resp.status(400).json({
                ok: false,
                msg: "el correo ya esta registrado"
            })
        }

        const usuario = new IUsuario ( req.body );

        //encriptar contraseña antes de guardar usuario
        //genero sal alaeatoria
        const salt = bcryptjs.genSaltSync()

        //encripto el pass con la sal
        usuario.password = bcryptjs.hashSync(password, salt)

        //guardar usuario
        await usuario.save();
        console.log("usuario creado: " + usuario)

        resp.status(200).json({
            ok: true,
            usuario
        });
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: "error al crear usuario inesperado revisar logs"
        })
    }
} 

const updateUsuario = async (req, resp = response ) => {

    //obtengo el uid enviado (que es el usuario que se quiere modificar)
    const uid = req.params.uid

    try {
        //TODO: validar token y verificar usuario

        //encuentro el usuario con ese uid
        const usuarioDb = await IUsuario.findById(uid)
        console.log("usuario encontrado: " + usuarioDb)
        
        //si el usuario no existe devuelvo un error
        if(!usuarioDb){
            return resp.status(404).json({
                ok: false,
                msg: "no existe un usuario con el id: "  + uid
            })
        }

        //actualizacion

        //creo una variable que va a tener todos los campos del body de es uid
        const campos = req.body

        if(usuarioDb.email === req.body.email){
            delete campos.email
        } else {
            const existeEmail = await IUsuario.findOne( {email: req.body.email})
            if (existeEmail) {
                return resp.status(400).json({
                    ok: false,
                    msg: "ya existe un usuario con ese email"
                })
            }
        }

        delete campos.google
        delete campos.password

        // se le pone {new: true} para que me devuelva el usuario actualizado a la primera
        const usuarioActualizado = await IUsuario.findByIdAndUpdate(uid, campos, {new: true})




        resp.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg : "error al actualizar"
        })
    }
}


module.exports = {
    getUsuarios,
    addUsuario, 
    updateUsuario
}