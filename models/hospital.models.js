const {Schema, model} = require('mongoose')


const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required : true
    }},
    { 
        //le agrego el timestamp de creacion y modificacion en la bd
        timestamps: true,
    
        //esto hace que se cree la coleccion con el nombre de hospitales y no que le ponga una
        // s al final de Hospital de manera automatica
        collection: 'hospitales'
    }
);

HospitalSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject()
    return object
})


//Hospital es el nombre de la tabla de Mongo  que va a manejar el HospitalSchema
module.exports = model ('Hospital', HospitalSchema)