import fs from 'fs';

// export const path = './src/files/productos.json'

export default class ManagerProduct {
    constructor() {
        this.products = [];
        this.path = './src/files/productos.json';
    }


    consultarProductos = async () => {


        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, JSON.stringify([]))
                .then((res) => console.log(`< ${this.path} > fue creado.`))
                .catch((err) => console.log("Producto no creado"));
        }

        try {
            const rawdata = await fs.promises.readFile(this.path, 'utf-8')
            const data = JSON.parse(rawdata, null, "\n")
            return data;

        } catch (error) {
            console.log(error)
        }
    }


    addID = async (product) => {
        const rawdata = await fs.promises.readFile(this.path, 'utf-8')
        const data = JSON.parse(rawdata, null, "\n")
        if (data.length === 0) {
            product.id = 0;
        } else {
            product.id = data[data.length - 1].id + 1;
            return product
        }
    }

    addProduct = async (title, description, price, thumbnail, status = true, code, stock, id) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            status,
            code,
            stock,
            id
        }

        if (!product.title || !product.description || !product.price || !product.status || !product.code || !product.stock) {
            console.error(`Complete todos los campos, por favor.`);
        };

        this.addID(product);
        let rawdata = await fs.promises.readFile(this.path, 'utf-8');
        let data = JSON.parse(rawdata, null, "\n")


        if (data.find(prod => prod.code === product.code)) {
            return console.error(`El producto con el code: ${product.code} ya existe:`);
        } else {
            data.push(product);
        }

        let prodtoArray = data;


        await fs.promises.writeFile(this.path, JSON.stringify(prodtoArray, null, '\t'))
            .then(() => { return console.log(`Se agrego ${product.title} sin problemas`) })
            .catch(err => console.log(err))
    }

    getProductsById = async (id) => {
        try {
            const rawdata = await fs.promises.readFile(this.path, 'utf-8')
            let data = JSON.parse(rawdata).find(prod => prod.id === id)
            if (!data) {
                throw new Error("Not found")
            } else {
                return data;
            }
        } catch (error) {
            return error.message
        }
    }

    updateProduct = async (id, updateObj) => {
        try {
            if (!id) {
                throw new Error("Error producto no encontrado")
            }

            let rawdata = await fs.promises.readFile(this.path, 'utf-8');

            let oldProd = JSON.parse(rawdata);

            const productoIndex = oldProd.findIndex(prod => prod.id === id);

            if (productoIndex === -1) {
                throw new Error(`Producto no encontrado con id ${id}`);
            }
            const newData = {
                ...oldProd[productoIndex],
                ...updateObj,
                id
            }

            oldProd[productoIndex] = newData;
            await fs.promises.writeFile(this.path, JSON.stringify(oldProd, null, '\t'));

        } catch (error) {
            return error.message
        }
    }

    deleteProduct = async (id) => {
        try {
            const rawdata = await fs.promises.readFile(this.path, 'utf-8')
            let data = JSON.parse(rawdata);
            const newData = data.filter(prod => prod.id !== id);

            await fs.promises.writeFile(this.path, JSON.stringify(newData, null, "\t"));
            return console.log("Producto eliminado");
        } catch (error) {
            return error.message
        }
    }
}
