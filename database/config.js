const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
       
        await mongoose.connect( process.env.DB_CONNECTION );
        console.log("mongo andando")
        

    } catch (error) {
        console.log(error)
        throw new Error('error al iniciar mongo ', error)
        
    }
   

}

module.exports = {
    dbConnection
}