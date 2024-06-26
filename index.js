const express = require('express');

//variables de sistema. Ejecuto una funcion llamada config() de nodemon. Esta funcion lee el archivo .evn
require('dotenv').config()
console.log('variables entorno andando')

//cors
const cors = require('cors')

const { dbConnection } = require('./database/config')


//crear el servidor express
const app = express();
console.log('servidor express andando')


//middleware de la dependencia de  cors
app.use(cors())
console.log('cors andando')

//carpeta publica
//tengo que ejectuar en el navegador http://localhost:3000/ para ver lo que esta en la carpeta publica
app.use ( express.static( 'public' ) )

//lectura y parseo body
app.use( express.json() )

//base de datos
dbConnection();
console.log('db on line')


//alta sevidor
//npm run start:dev

//mongodb+srv://laivetta:<password>@cluster0.h835awr.mongodb.net/
//mongodb+srv://laivetta:cerro1870@cluster0.h835awr.mongodb.net/t/
//laivetta
//cerro1870



//rutas
app.use( '/api/usuarios' , require('./routes/usuarios.routes')  )
app.use( '/api/login' , require('./routes/auth.routes')  )
app.use('/api/hospitales', require('./routes/hospitales.routes'))
app.use('/api/medicos', require('./routes/medicos.routes'))
app.use('/api/todo', require ('./routes/busquedas.routes'))
app.use('/api/upload', require ('./routes/uploads.routes'))


//ruta de prueba ping para ver si el server backend esta andando
app.use('/api/ping', require('./routes/ping.routes'))


app.listen ( process.env.PORT, () => {
    console.log ('servidor corriendo puerto ' + process.env.PORT )
} )

console.log("para probar el server: https://sistema-mongo.onrender.com/api/ping")

