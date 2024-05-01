//importo la libreria
const {OAuth2Client} = require('google-auth-library');

//creo un instancia de la liberia con el secreto mio de google
const client = new OAuth2Client( process.env.GOOGLE_SECRET );



// creo una funcion asincrona, a la cual hay que pasarla el TOKEN de GOOGLE
// , que va  devolver el NAME, EMAIL, IMAGEN de GOOGLE
async function googleVerify( token ) {
  
  //el token es el del USUARIO que se logea, y audience es el MIO que est en el .ENV
  const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const payload = ticket.getPayload();
  const {name, email, picture} = payload

  return {name, email, picture}
}

module.exports = { googleVerify }