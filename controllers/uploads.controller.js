const { response } = require("express");


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

      //validar imagen...


    resp.json({
        ok: true,
        msg: 'file uploaded' 
    })
}

module.exports = {
    fileUpload
}