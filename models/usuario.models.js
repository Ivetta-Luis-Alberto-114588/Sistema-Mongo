const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema ({

    nombre:{ type: String, required: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    img: {type: String},
    role: {type: String, required: true, default: 'USER_ROLE'},
    google: { type: Boolean, default: false}},
    {
        //le agrego el timestamp de creacion y modificacion en la bd
        timestamps: true
    }

);

//esto es para cambiar la forma de ver el _id que muestra mongo y pasarlo a mostrar como uid
UsuarioSchema.method('toJSON', function() {
    // const { __v, _id,  ...object} = this.toObject();
    const { __v, _id, password,  ...object} = this.toObject();
    
    object.uid = _id
    return object
})

//Usuario es el nombre de la tabla de Mongo que va a manejar el UsuarioSchema
module.exports = model ( 'Usuario', UsuarioSchema )