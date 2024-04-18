const {response} = require('express')
const Usuario = require('../models/usuario.models')
const Hospital = require('../models/hospital.models')
const Medico = require('../models/medico.models')

const getTodo = async (req, resp = response) =>{

    //recupero el parametro
    const busqueda = req.params.busqueda

    //tranformo la busqueda en regular expresion
    const busquedaRegExp = new RegExp(busqueda, 'i')

    //ahora busco en la bd la expresion regular en cada una de las colecciones dentro del campo nombre
    
    // const usuarios = await Usuario.find( { nombre : busquedaRegExp } )
    // const hospitales = await Hospital.find( { nombre : busquedaRegExp } )
    // const medicos = await Medico.find( { nombre : busquedaRegExp } )


    //utilizo Promise.all para que se ejecuten en paralelo
    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find( { nombre : busquedaRegExp } ),
        Hospital.find( { nombre : busquedaRegExp } ),
        Medico.find( { nombre : busquedaRegExp } )
    ])


    resp.status(200).json({
        ok: true,
        usuarios,
        hospitales,
        medicos

    })

}

const getDocumentoColeccion = async (req, resp = response) =>{

    //recupero los parametros
    const busqueda = req.params.busqueda
    const tabla = req.params.tabla

    //tranformo la busqueda en regular expresion
    const busquedaRegExp = new RegExp(busqueda, 'i')

    let data = [] //genero el array donde voy a guardar los datos 


    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find ({  nombre : busquedaRegExp})

            break;
        case 'hospitales':
            data = await Hospital.find ({  nombre : busquedaRegExp})
                                    .populate('usuario', 'nombre img')
            break;
        case 'medicos':
            data = await Medico.find ({  nombre : busquedaRegExp})
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img')
            break;
    
        default:
            return resp.status(400).json({
                ok: false,
                msg: "coleccion no encontrada debe ser usuarios, medicos, hospitales"
            })            

    }

    resp.json({
        ok: true,
        resultado : data
    })


}

module.exports = { getTodo , getDocumentoColeccion}