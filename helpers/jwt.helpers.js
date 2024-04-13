const jwt = require('jsonwebtoken')

const generarJwt =  ( uid ) => {

    return new Promise( (resolve, reject)=>{
       
        const payload = {
            uid,
        }
    
        jwt.sign( payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) =>{
            if (err){
                console.log (err)
                reject("error al generar el jwt" + err)
            } else {
                resolve ( token )
            }
        } )
    } )
    
}

module.exports = {generarJwt}
