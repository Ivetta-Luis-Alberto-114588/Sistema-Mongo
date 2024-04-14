const {response} = require('express')
const jwt = require('jsonwebtoken')


const validarJwt = (req, resp = response, next) =>{

    //leer headers
    const token = req.header('x-token')
    
    //validar que exista el token
    if(!token){
        return resp.status(401).json({
            ok: false,
            msg: "no hay token en la peticion"
        })
    }

    //validar que el token sea valido
    try {

        //verifico que el token capturado sea igual al proceso de tokenizar con la semilla del jwt
        // y lo extraigo para despues agregarlo a la request
        //el uid es de la persona que se autentico. Esto es debido a que el token tiene en el payload el uid
        const { uid } = jwt.verify (token, process.env.JWT_SECRET )
        

        //este middlewere va a agregar en el cuerpo de la response el uid
        req.uid = uid;
        
        //seguir con el middlewares
        next();


    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: "token no valido"
        })
    }



}


module.exports = {
    validarJwt
}