const fs = require('fs');

const path = 'productos.json'

class ManagerProduct {
    constructor() {
        
    }
    consultarProductos = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, 'utf-8');
            const product = JSON.parse(data);
            return product;
        }
    }
    crearProducto = async (producto) => {
        const productos = await this.consultarProductos();
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




































// class ProductManager {
//     constructor(path) {
//         this.path = path;
//         this.products = [];
//         this.lastId = 0;
//     }
//     addProduct(producto) {
//         if (!this.validarObligatorios(producto)) {
//             console.log("Completa el campo, por favor");
//             return;
//         }
//         if (this.validarDuplicado(producto.codigo)) {
//             console.log("Ya existe ese producto");
//             return;
//         }
//         const id = this.generarId();
//         const productoId = { ...producto, id };
//         this.products.push(productoId);
//     }

//     actualizarProducto(id, datosActualizados) {
//         const producto = this.getProductByI(id);
//         if (!producto) {
//             console.log("Producto no encontrado");
//             return;
//         }

//         Object.assign(producto, datosActualizados);
//         console.log("Producto actualizado");
//     }
//     validarObligatorios(producto) {
//         return (
//             producto.nombre &&
//             producto.descripcion &&
//             producto.precio &&
//             producto.codigo &&
//             producto.stock
//         );
//     }
//     validarDuplicado(codigo) {
//         return this.products.some((producto) => producto.codigo === codigo);
//     }
//     generarId() {
//         this.lastId++;
//         return this.lastId;
//     }
//     eliminarProducto(id) {
//         this.products = this.products.filter((producto) => producto.id !== id);
//         console.log("PRODUCTO ELIMINADO")
//     }
//     getProductByI(id) {
//         return this.products.find((producto) => producto.id === id);
//     }
//     getproducts() {
//         console.log("Lista de productos:");
//         this.products.forEach((producto) => {
//             console.log(`- ID: ${producto.id}`);
//             console.log(`  Nombre: ${producto.nombre}`);
//             console.log(`  Descripción: ${producto.descripcion}`);
//             console.log(`  Precio: $${producto.precio}`);
//             console.log(`  Código: ${producto.codigo}`);
//             console.log(`  Stock: ${producto.stock}`);
//         });
//     }
//     actualizarLastId() {
//         if (this.products.length > 0) {
//             const maxId = Math.max(...this.products.map((producto) => producto.id));
//             this.lastId = maxId;
//         }
//     }

// }

// const productManager = new ProductManager();

// const producto = {
//     nombre: "Remera",
//     descripcion: "Remera Adidas",
//     precio: 10000,
//     codigo: "ADI111",
//     stock: 2,
// };

// const producto2 = {
//     nombre: "Zapatillas Adidas",
//     descripcion: "Yeezy 350",
//     precio: 60000,
//     codigo: "YEEZY",
//     stock: 7,
// };

// productManager.addProduct(producto);
// productManager.addProduct(producto2);
// productManager.getproducts();

// const productofind = productManager.getProductByI(2);
// console.log("Producto encontrado:", productofind);
// productManager.getproducts();
// productManager.actualizarProducto(2, {
//     nombre: "Nike Air Force 1",
//     precio: 43000,
//     stock: 1,
// });
// productManager.getproducts();