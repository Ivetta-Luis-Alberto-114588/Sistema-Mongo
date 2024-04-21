
const Usuario = require('../models/usuario.models')
const Hospital =  require ('../models/hospital.models')
const Medico = require ('../models/medico.models')
const fs = require ('fs')


const borrarImagen = ( path ) => {
    //si existe el archivo viejo la borra
    if( fs.existsSync( path ) ){
        fs.unlinkSync( pathViejo )
    }
}

const actualizarImagen = async ( tipo, id, nombreArchivo ) => {

    switch ( tipo  ) {
        case 'medicos':

            const medico = await Medico.findById(id)

            //verifico que exista el medico
            if( !medico ){
                console.log("no se encontro el medico por id")
                return false
            }

            //borrar imagen                    
            const pathViejoMedico = `./uploads/medicos/${ medico.img }`
            borrarImagen( pathViejoMedico )


            //ahora si no existe el archivo viejo
            medico.img = nombreArchivo
            await medico.save()
            return true;

        break;

        case 'hospitales':
            const hospital = await Hospital.findById(id)

            //verifico que exista el hospital
            if( !hospital ){
                console.log("no se encontro el hospital por id")
                return false
            }

            //borrar imagen                    
            const pathViejoHospital = `./uploads/hospitales/${ hospital.img }`
            borrarImagen( pathViejoHospital )


            //ahora si no existe el archivo viejo
            hospital.img = nombreArchivo
            await hospital.save()
            return true;
        
        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id)

            //verifico que exista el usuario
            if( !usuario ){
                console.log("no se encontro el usuairo por id")
                return false
            }

            //borrar imagen                    
            const pathViejoUsuario = `./uploads/usuarios/${ usuario.img }`
            borrarImagen( pathViejoUsuario )


            //ahora si no existe el archivo viejo
            usuario.img = nombreArchivo
            await usuario.save()
            return true;
            
        break;
    
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}