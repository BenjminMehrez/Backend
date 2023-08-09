const fs = require('fs');


const path = './my-backend/productos.json'

class ManagerProduct {
    constructor(path) {
        this.path = path
    }
    consultarProductos = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
            const product = JSON.parse(data);
            return product;
        } else {
            console.log('Archivo no existe');
            return[]
        }
    }
    getProductsById = async (id) => {
        const productos = await this.consultarProductos()
        const producto = productos.find(p => p.id === id)
        if (producto) {
            return producto
        } else {
            return 'Producto no existe'
        }
    }
    crearProducto = async (producto) => {
        const productos = await this.consultarProductos();
        const id = this.#addId(productos)
        const newProduct = { id, ...producto }
        productos.push(newProduct);
        await fs.promises.writeFile(path, JSON.stringify(productos))
        return newProduct
    }
    deleteProducts = async () => {
        if (fs.existsSync(path)) {
            await fs.promises.unlink(path)
            return 'Productos ELIMINADOS'
        } else {
            return 'Archivo no encontrado'
        }
    }
    deleteProductsById = async (id) => {
        const productos = await this.consultarProductos()
        const arrayProductsNew = productos.filter((p) => p.id !== id)
        await fs.promises.writeFile(path, JSON.stringify(arrayProductsNew))
    }
    updateProduct = async (id, obj) => {
        const productos = await this.consultarProductos()
        const indexProduct = productos.findIndex(p => p.id === id)
        if (indexProduct === -1) {
            return 'Producto no encontrado'
        }
        const productUpdate = { ...productos[indexProduct], ...obj }
        productos.splice(indexProduct, 1, productUpdate)
        await fs.promises.writeFile(path, JSON.stringify(productos))
    }
    #addId = (productos) => {
        let id
        if (productos.length === 0) {
            id = 1
        } else {
            id = productos[productos.length - 1].id + 1
        }
        return id
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
    let producto1 = {
        nombre: "Zapatilla",
        descripcion: "Zapatilla Adidas",
        precio: 15000,
        codigo: "ADI122",
        stock: 1,
    }
    await manager.crearProducto(producto);
    await manager.crearProducto(producto1);
    let segundaConsulta = await manager.consultarProductos();
    await manager.deleteProductsById(2)
    await manager.deleteProducts()
    // await manager.updateProduct()
    console.log(segundaConsulta);
}

crearProductos();   