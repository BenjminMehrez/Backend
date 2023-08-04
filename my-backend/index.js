const fs = require('fs');

const path = './my-backend/productos.json'

class ManagerProduct {
    constructor() {
        
    }
    consultarProductos  = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
            const product = JSON.parse(data);
            return product;
        }
    }
    crearProducto = async (producto) => {
        // const productos = await this.consultarProductos();
        const productos = [];
        productos.push(producto);
        await fs.promises.writeFile(path, JSON.stringify(productos))
    }
}

const manager = new ManagerProduct();

const crearProductos = async () => {
    let consultarProductos = await manager.consultarProductos();
    console.log(consultarProductos);

    let producto = {
        nombre: "Remera",
        descripcion: "Remera Adidas",
        precio: 10000,
        codigo: "ADI111",
        stock: 2,
    };
    await manager.crearProducto(producto);
    let segundaConsulta = await manager.consultarProductos();
    console.log(segundaConsulta);
}

crearProductos();   