const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
       
        await mongoose.connect( process.env.DB_CONNECTION );
        

    } catch (error) {
        console.log(error)
        throw new Error('error al iniciar la bd', error)
        
    }
   

}

module.exports = {
    dbConnection
}