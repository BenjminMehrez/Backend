
class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.lastId = 0;
    }
    addProduct(producto) {
        if (!this.validarObligatorios(producto)) {
            console.log("Completa el campo, por favor");
            return;
        }
        if (this.validarDuplicado(producto.codigo)) {
            console.log("Ya existe ese producto");
            return;
        }
        const id = this.generarId();
        const productoId = { ...producto, id };
        this.products.push(productoId);
    }

    actualizarProducto(id, datosActualizados) {
        const producto = this.getProductByI(id);
        if (!producto) {
            console.log("Producto no encontrado");
            return;
        }

        Object.assign(producto, datosActualizados);
        console.log("Producto actualizado");
    }
    //------------------------
    validarObligatorios(producto) {
        return (
            producto.nombre &&
            producto.descripcion &&
            producto.precio &&
            producto.codigo &&
            producto.stock
        );
    }
    validarDuplicado(codigo) {
        return this.products.some((producto) => producto.codigo === codigo);
    }
    generarId() {
        this.lastId++;
        return this.lastId;
    }
    eliminarProducto(id) {
        this.products = this.products.filter((producto) => producto.id !== id);
        console.log("PRODUCTO ELIMINADO")
    }
    getProductByI(id) {
        return this.products.find((producto) => producto.id === id);
    }
    getproducts() {
        console.log("Lista de productos:");
        this.products.forEach((producto) => {
            console.log(`- ID: ${producto.id}`);
            console.log(`  Nombre: ${producto.nombre}`);
            console.log(`  Descripción: ${producto.descripcion}`);
            console.log(`  Precio: $${producto.precio}`);
            console.log(`  Código: ${producto.codigo}`);
            console.log(`  Stock: ${producto.stock}`);
        });
    }
    actualizarLastId() {
        if (this.products.length > 0) {
            const maxId = Math.max(...this.products.map((producto) => producto.id));
            this.lastId = maxId;
        }
    }

}

const productManager = new ProductManager("productos.json");

const producto = {
    nombre: "Audifonos",
    descripcion: "Audifonos Sony",
    precio: 250000,
    codigo: "SNQ122",
    stock: 5,
};

const producto2 = {
    nombre: "Samsung S22",
    descripcion: "Telefono Samsung S22",
    precio: 4200000,
    codigo: "SPSS23",
    stock: 15,
};

productManager.addProduct(producto);
productManager.addProduct(producto2);
productManager.getproducts();

const productofind = productManager.getProductByI(2);
console.log("Producto encontrado:", productofind);
productManager.getproducts();
productManager.actualizarProducto(2, {
    nombre: "Samsung S21",
    precio: 5000000,
    stock: 8,
});
productManager.getproducts();