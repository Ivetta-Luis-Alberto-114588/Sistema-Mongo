const path = require('path')
const fs = require('fs')
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen.helpers');


const fileUpload = (req, resp = response) => {

    const tipo = req.params.tipo
    const id = req.params.id

    //validar colecciones pasada por parametros
    const tiposValidos = ['medicos', 'hospitales', 'usuarios']
    if ( !tiposValidos.includes(tipo) ){
        return resp.status(400).json({
            ok: false,
            msg: 'debe seleccionar solo medicos, hospitales, usuarios'
        })
    }


    //validacion que exista un archivo para subir
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
      }

      //procesar imagen...
      //tengo acceso a los files por el middleware de la instalacion expressFileUpload() que esta en la ruta
      const file = req.files.imagen
     
      //obtener la extension del archivo
      const nombreCortado = file.name.split('.')  //esto me devuelve un arreglo donde cada miembre fue seaparado por el .
      const extensionArchivo = nombreCortado[ nombreCortado.length -1] //obtengo el ultimo termino del array

      //validar extension
      const extensionesValidas = ['jpg', 'jpeg', 'png']
      if( !extensionesValidas.includes(extensionArchivo)){
        return resp.status(400).json({
            ok: false,
            msg:"extension del archivo no valida, solo jpg, jpeg y png"
        })
      }

      //generar el nombre del archivo con uuid
      const nombreArchivo =   `${ uuidv4() }.${extensionArchivo}`


      //crear el path para guardar el archivo
      const path = `./uploads/${tipo}/${nombreArchivo}`

       // mover la imagen
        file.mv(path, (err) => {
            if (err){
                console.log(err)
                return resp.status(500).json({
                    ok: true,
                    msg: "error al mover la imagen"
                })

            }

            //actualizar la base de datos
            actualizarImagen( tipo, id, nombreArchivo );

            resp.json({
                ok: true,
                msg: "archivo subido" ,
                nombreArchivo
            })
        });

}

const retornaImage = (req, resp= response ) => {
    const tipo = req.params.tipo
    const foto = req.params.foto

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${  foto }` ) 

    //cargar imagen por defecto si no existe la imagen
    if ( fs.existsSync( pathImg )) {
        resp.sendFile ( pathImg )        
    } else {
        const pathImg = path.join( __dirname, `../uploads/no_disponible.jpg` )
        resp.sendFile ( pathImg ) 
        
    }


}

module.exports = {
    fileUpload,
    retornaImage
}