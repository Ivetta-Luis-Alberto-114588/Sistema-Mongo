const {response} = require('express')
const Usuario = require('../models/usuario.models')
const bcryptjs = require('bcryptjs')
const { generarJwt } = require('../helpers/jwt.helpers')


const getUsuarios = async (req, resp)=> {
    
    //capturo el query que pasan en la request con en nombre desde
    //si no viene nada en el query entonces va a poner un 0
    const desde = Number( req.query.desde ) || 0
      

    //observar que no se pone el uid para devolver, pero sin embargo el middleware lo agrega al header
    const [usuarios, total] = await  Promise.all([ Usuario
                            .find( {}, 'nombre email password role google img ' ) //aca son las propiedades
                            //     que quiero mostrar
                            .skip( desde )  //esto va a hacer saltearse todo antes del skip
                            .limit ( 5 ), //aca digo cuantos registros voy a mostrar

                            //cuento la cantidad total de registros en la bd
                            Usuario.countDocuments()
    
    ])
    
    resp.status(200).json({
        ok: true,
        usuarios,
        total,

        //estoy tomando esto de la req del body que lo agregue con el middleware
        "uid del que hizo peticion": req.uid
    });
} 

//creacion de usuario
const addUsuario = async (req, resp = response)=> {

    //estoy exponiendo las propiedades del body que voy a 
    // usar para hacer el usuario, si me olvido de alguna
    // no se va  guardar en la bd
    const {password, email, nombre, img} = req.body        

    try {

        const existeEmail = await Usuario.findOne( {email})

        if( existeEmail){
            return resp.status(400).json({
                ok: false,
                msg: "el correo ya esta registrado"
            })
        }

        const usuario = new Usuario ( req.body );

        //encriptar contraseña antes de guardar usuario
        //genero sal alaeatoria
        const salt = bcryptjs.genSaltSync()

        //encripto el pass con la sal
        usuario.password = bcryptjs.hashSync(password, salt)

        //asignar img
        usuario.img = img

        //guardar usuario
        await usuario.save();
        console.log("usuario creado: " + usuario)

        //generar jwt
        const token = await generarJwt(usuario._id)
        console.log("uid del usuario: " + usuario._id)
        console.log("token: " + token)

        resp.status(200).json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: "error al crear usuario inesperado revisar logs"
        })
    }
} 

//actualizacion de usuario
// const updateUsuario = async (req, resp = response ) => {

//     //obtengo el uid enviado (que es el usuario que se quiere modificar)
//     const uid = req.params.uid

//     try {
//         //TODO: validar token y verificar usuario

//         //encuentro el usuario con ese uid
//         const usuarioDb = await Usuario.findById(uid)
//         console.log("usuario encontrado: " + usuarioDb)
        
//         //si el usuario no existe devuelvo un error
//         if(!usuarioDb){
//             return resp.status(404).json({
//                 ok: false,
//                 msg: "no existe un usuario con el id: "  + uid
//             })
//         }

//         //actualizacion

//         //creo una variable que va a tener todos los campos del body de es uid
//         const {password, google, email, ...campos} = req.body

//         if(usuarioDb.email !== email){
            
//             const existeEmail = await Usuario.findOne( { email })
//             if ( existeEmail ) {
//                 return resp.status(400).json({
//                     ok: false,
//                     msg: "ya existe un usuario con ese email"
//                 })
//             }
//         }

//         //en el caso que no sea un usuario de google entonces va a poder actualizar el email
//         //si es un usuario de google no debe poder actualizar el email
//         if( !usuarioDb.google ){
//             campos.email = email
//         } else if( usuarioDb !== email){
//             return resp.status(400).json({
//                 ok: false,
//                 msg: "los usuarios de google no pueden cambiar su email"
//             })
//         }

//         // se le pone {new: true} para que me devuelva el usuario actualizado a la primera
//         const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true})

//         resp.json({
//             ok: true,
//             usuario: usuarioActualizado
//         })
        
//     } catch (error) {
//         console.log(error)
//         resp.status(500).json({
//             ok: false,
//             msg : "error al actualizar"
//         })
//     }
// }

const updateUsuario = async (req, resp = response ) => {
    const uid = req.params.uid

    try {
        const usuarioDb = await Usuario.findById(uid)
        
        if(!usuarioDb){
            return resp.status(404).json({
                ok: false,
                msg: "no existe un usuario con el id: "  + uid
            })
        }

        const {password, google, email, ...campos} = req.body

        if(usuarioDb.email !== email){
            const existeEmail = await Usuario.findOne( { email })
            if ( existeEmail ) {
                return resp.status(400).json({
                    ok: false,
                    msg: "ya existe un usuario con ese email"
                })
            }
        }

        if( usuarioDb.google ){
            delete campos.email;
        } else if(usuarioDb.email !== email){
            campos.email = email
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true})

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

const deleteUsuario = async (req, resp = response ) => {
    
    const uid = req.params.uid
    
    try {

        const usuarioBd = await Usuario.findById(uid)
  
        if( !usuarioBd ){
            return resp.status(404).json({
                ok: false,
                msg: "usuario no encontrado"
            })
        }
    
        await Usuario.findByIdAndDelete ( uid )      

        resp.json({
            ok: true,
            msg: "usuario eliminado" 
        })
        
    } catch (error) {
        console.log("error al borrar usuario " + error)
        resp.status(500).json({
            ok: false,
            msg : "error al borrar usuario"
        
        })
    }
    
    

}


module.exports = {
    getUsuarios,
    addUsuario, 
    updateUsuario,
    deleteUsuario
}