import dotenv from 'dotenv';

dotenv.config()

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    clientID: process.env.CLIENT_ID, 
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
    secretSession: process.env.SECRET,
    environment: process.env.ENVIRONMENT,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD,

}


// export const config = {
//     server:{
//         port:8080,
//         secretSession:"CoderSecret"
//     },
//     fileSystem:{
//         productsFile:"products.json",
//         cartFile:"carts.json"
//     },
//     mongo:{
//         url:"mongodb+srv://PracticaIntegradora:12344@cursobackend.aoxi4e7.mongodb.net/ecommerce"
//     },
//     github:{
//         clientId:"Iv1.678adf8aec4b77de",
//         clienteSecret:"1c15f4c29881e12f1990e98a872e97d9bcfa73d2",
//         callbackUrl:"http://localhost:8080/api/session/githubCallback"
//     }
// }
