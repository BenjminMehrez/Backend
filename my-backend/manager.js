// const fs = require('fs');

// const path = './productos.json'

// export default class ManagerProduct {
//     constructor() {

//     }
//     consultarProducto = async () => {
//         if (fs.existsSync(path)) {
//             const data = await fs.promises.readFile(path, 'utf-8');
//             const product = JSON.parse(data);
//             return product;
//         }
//     }
//     crearProducto = async (producto) => {
//         const productos = await this.cunsultarProductos();
//         productos.push(producto);
//         await fs.promises.writeFile(path, JSON.stringify(productos))
//     }
// }