const express = require('express');
const ManagerProduct = require('..');


const manager = new ManagerProduct('./productos.json')

const app = express();

app.use(express.urlencoded({ extended: true }));

// const productos = [
//     { id: 1, nombre: 'Remera', precio: 11000, descripcion: 'Remera Puma', stock: 3 },
//     { id: 2, nombre: 'Zapatilla', precio: 37000, descripcion: 'Zapatill AirForce 1', stock: 5 },
//     { id: 3, nombre: 'Botines', precio: 31000, descripcion: 'Botines Future Play', stock: 2 },
//     { id: 4, nombre: 'Campera', precio: 47000, descripcion: 'Campera TheNorthFace', stock: 1 },
// ]

app.get('/', (req, res) => {
    res.send(`Bienvenidos`)
})


app.get("/productos/", async (req, res) => {
    let { limit } = req.query
    if (!limit) {
        res.send(await manager.consultarProductos().then(r => r))
    }
    else {
        res.send(await manager.consultarProductos().then(r => r.slice(0, limit)))
    }

})

app.get("/productos/:pid", async (req, res) => {
    let id = parseInt(req.params.pid)
    res.send(await manager.getProductsById(id).then(r => r))
})



app.listen(8080, () => {
    console.log('Servidor arriva')
})

