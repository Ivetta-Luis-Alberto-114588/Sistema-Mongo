const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema ({

    nombre:{ type: String, required: true},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    img: {type: String},
    role: {type: String, required: true, default: 'USER_ROLE'},
    google: { type: Boolean, default: false}},
    {
        timestamps: true
    }

);

//esto es para cambiar la forma de ver el _id que muestra mongo y pasarlo a mostrar como uid
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object} = this.toObject();
    object.uid = _id
    return object
})


module.exports = model ( 'Usuario', UsuarioSchema )