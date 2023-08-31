import { Router } from "express";
import ManagerProduct from "../managers/managerProduct.js";

const manager = new ManagerProduct()
const router = Router();

router.get('/', async (req, res) => {
    const products = await manager.consultarProductos();
    const limit = Number(req.query.limit);

    if (!limit) {
        res.render('home', {style: 'index.css', products});
    }else {
        const limitedProducts = products.slice(0, limit);
        res.render('home', {style: 'index.css', limitedProducts});
    }
})

export default router; 