export const config = {
    server:{
        port:8080,
        secretSession:"CoderSecret"
    },
    fileSystem:{
        productsFile:"products.json",
        cartFile:"carts.json"
    },
    mongo:{
        url:"mongodb+srv://PracticaIntegradora:12344@cursobackend.aoxi4e7.mongodb.net/ecommerce"
    },
    github:{
        clientId:"Iv1.678adf8aec4b77de",
        clienteSecret:"1c15f4c29881e12f1990e98a872e97d9bcfa73d2",
        callbackUrl:"http://localhost:8080/api/session/githubCallback"
    }
}