const express = require('express');

//variables de sistema
require('dotenv').config()
console.log('variables entorno andando')

//cors
const cors = require('cors')

const { dbConnection } = require('./database/config')


//crear el servidor express
const app = express();
console.log('servidor express andando')


//configurar cors
app.use(cors())
console.log('cors andando')

//base de datos
dbConnection();
console.log('db on line')

//alta sevidor
//npm run start:dev

//mongodb+srv://laivetta:<password>@cluster0.h835awr.mongodb.net/
//mongodb+srv://laivetta:cerro1870@cluster0.h835awr.mongodb.net/t/
//laivetta
//cerro1870



app.get( '/', (req, resp)=> {
    resp.status(200).json({
        ok: true,
        msg: 'Hola Mundo!!!'
    });
} );

app.listen ( process.env.PORT, () => {
    console.log ('servidor corriendo puerto ' + process.env.PORT )
} )