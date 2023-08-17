import { Router } from 'express';

const router = Router();

const carts = [];

router.get('/', (req, res) => {
    res.send(carts)
})

router.post('/', (req, res) => {
    const carts = req.body; 
    productos.push(carts);
    res.send({ status: "success", message: "Producto Agregado" })
})

export default router; 