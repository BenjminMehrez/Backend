import { Router } from "express"
import CartManager from "../dao/mongomanagers/cartMongo.js"
import ProductManager from "../dao/mongomanagers/productMongo.js"


const cm = new CartManager()
const pm = new ProductManager()


const router = Router()

router.get("/", async (req, res) => {
    const carrito = await cm.getCarts()
    res.json({ carrito })
})

router.get("/:cid", async (req, res) => {
    const { cid } = req.params
    const carritofound = await cm.getCartById(cid)
    res.json({ status: "success", carritofound })
})



router.post('/', async (req, res) => {
    try {
        const { obj } = req.body;

        if (!Array.isArray(obj)) {
            return res.status(400).send('Invalid request: products must be an array');
        }

        const validProducts = [];

        for (const product of obj) {
            const checkId = await pm.getProductById(product._id);
            if (checkId === null) {
                return res.status(404).send(`Product with id ${product._id} not found`);
            }
            validProducts.push(checkId);
        }

        const cart = await cm.addCart(validProducts);
        res.status(200).send(cart);

    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});






router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const checkIdProduct = await pm.getProductById(pid);
        if (!checkIdProduct) {
            return res.status(404).send({ message: `Product with ID: ${pid} not found` });
        }

        const checkIdCart = await cm.getCartById(cid);
        if (!checkIdCart) {
            return res.status(404).send({ message: `Cart with ID: ${cid} not found` });
        }

        const result = await cm.addProductInCart(cid, { _id: pid, quantity: quantity });
        console.log(result);
        return res.status(200).send({
            message: `Product with ID: ${pid} added to cart with ID: ${cid}`,
            cart: result,
        });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).send({ message: "An error occurred while processing the request" });
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;

        for (const product of products) {
            const checkId = await pm.getProductById(product._id);

            if (!checkId) {
                return res.status(404).send({ status: 'error', message: `El ID del producto: ${product._id} no existe` });
            }
        }
        const checkIdCart = await cm.getCartById(cid);
        if (!checkIdCart) {
            return res.status(404).send({ status: 'error', message: `El ID cart: ${cid} no existe` });
        }

        const cart = await cm.updateOneProduct(cid, products);
        return res.status(200).send({ status: 'success', payload: cart });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 'error', message: 'Ocurrió un error al procesar este request' });
    }
})

//elimina un producto
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const checkIdProduct = await pm.getProductById(pid);
        if (!checkIdProduct) {
            return res.status(404).send({ status: 'error', message: `Producto con ID: ${pid} no existe` });
        }
        const checkIdCart = await cm.getCartById(cid);
        if (!checkIdCart) {
            return res.status(404).send({ status: 'error', message: `Cart con ID: ${cid} no existe` });
        }
        const findProductIndex = checkIdCart.products.findIndex((product) => product._id.toString() === pid);
        if (findProductIndex === -1) {
            return res.status(404).send({ status: 'error', message: `Producto con ID: ${pid} no encontrado en cart` });
        }
        checkIdCart.products.splice(findProductIndex, 1);
        const updatedCart = await cm.deleteProductInCart(cid, checkIdCart.products);
        return res.status(200).send({ status: 'success', message: `Borrado el producto con ID: ${pid}`, cart: updatedCart });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 'error', message: 'Error al procesar el request' });
    }
})
//elimina todos
router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cm.getCartById(cid);
        if (!cart) {
            return res.status(404).send({ message: `Cart con ID: ${cid} no existe` });
        }
        if (cart.products.length === 0) {
            return res.status(404).send({ message: 'La cart esta vacía' });
        }
        cart.products = [];
        await cm.updateOneProduct(cid, cart.products);
        return res.status(200).send({
            status: 'success',
            message: `La cart con ID: ${cid} fue vaciada correctamente`,
            cart: cart,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error al procesar el request' });
    }
})

export default router;
