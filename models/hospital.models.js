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
    }
    //esto hace que se cree la coleccion con el nombre de hospitales y no que le ponga una
    // s al final de Hospital de manera automatica
}, {collection: 'hospitales'}  );

HospitalSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject()
    return object
})



module.exports = model ('Hospital', HospitalSchema)