const {Schema, model} = require('mongoose')


const MedicoSchema = Schema({
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
        required: true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },

    },
    { 
        //le agrego el timestamp de creacion y modificacion en la bd
        timestamps: true,

        //esto hace que se cree la coleccion con el nombre de medicos y no que le ponga una
        // s al final de Medicos de manera automatica
        collection: 'medicos'
    } 
);

MedicoSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject()
    return object
})


//Medico es el nombre de la tabla de Mongo  que va a manejar el MedicoSchema
module.exports = model ('Medico', MedicoSchema)