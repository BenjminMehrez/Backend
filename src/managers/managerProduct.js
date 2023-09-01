import fs from 'fs';

// export const path = './src/files/productos.json'

export default class ManagerProduct {
    constructor() {
        this.path = './src/files/productos.json';
    }

    consultarProductos = async (info) => {
        const { limit } = info
        try {
            if (fs.existsSync(this.path)) {
                const productlist = await fs.promises.readFile(this.path, "utf-8")
                const productlistparse = JSON.parse(productlist)
                const productlistsliced = productlistparse.slice(0, limit)
                return productlistsliced
            }
            else {
                console.error("Producto no creado")
                return
            }
        }
        catch (error) {
            throw new Error(error)
        }
    }

    getProductbyId = async (id) => {
        const { pid } = id
        const allproducts = await this.consultarProductos({})
        const found = allproducts.find(element => element.id === parseInt(pid))
        if (found) {
            return found
        }
        else {
            console.error("Not found")
        }
    }

    addId = async () => {
        if (fs.existsSync(this.path)) {
            const listaproducts = await this.consultarProductos({})
            const counter = listaproducts.length
            if (counter == 0) {
                return 1
            }
            else {
                return (listaproducts[counter - 1].id) + 1
            }
        }
    }

    addProduct = async (obj) => {
        const { 
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock } = obj

        if (title === undefined || 
            description === undefined || 
            price === undefined || 
            code === undefined || 
            stock === undefined) {
            console.error("Complete todos los campos, por favor.")
            return
        }
        else {
            const listaproducts = await this.consultarProductos({})
            const codigorepetido = listaproducts.find(elemento => elemento.code === code)
            if (codigorepetido) {
                console.error("El producto ya existe")
                return
            }
            else {
                const id = await this.addId()
                const productnew = {
                    title, 
                    description, 
                    price, 
                    thumbnail, 
                    code, 
                    stock, 
                    id
                }
                listaproducts.push(productnew)
                await fs.promises.writeFile(this.path, JSON.stringify(listaproducts, null, 2))
            }
        }
    }
    updateProduct = async (id, obj) => {
        const { pid } = id
        const { title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock } = obj
            
        if (title === undefined || 
            description === undefined || 
            price === undefined || 
            code === undefined || 
            stock === undefined) {
            console.error("Error producto no encontrado")
            return
        }
        else {
            const allproducts = await this.consultarProductos({})
            const codigorepetido = allproducts.find(elemento => elemento.code === code)
            if (codigorepetido) {
                console.error("El producto ya existe")
                return
            }
            else {
                const newProductsList = allproducts.map(elemento => {
                    if (elemento.id === parseInt(pid)) {
                        const updatedProduct = {
                            ...elemento,
                            title, description, price, thumbnail, code, stock
                        }
                        return updatedProduct
                    }
                    else {
                        return elemento
                    }
                })
                await fs.promises.writeFile(this.path, JSON.stringify(newProductsList, null, 2))

            }

        }
    }

    deleteProduct = async (pid) => {

        const allproducts = await this.consultarProductos({})
        const productswithoutfound = allproducts.filter(elemento => elemento.id !== parseInt(pid))
        await fs.promises.writeFile(this.path, JSON.stringify(productswithoutfound, null, 2))
    }
}

