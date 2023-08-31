import { Router } from "express";
import ManagerProduct from "../managers/managerProduct.js";
import  __dirname  from "../utils.js";

const manager = new ManagerProduct(__dirname + '/files/productos.json')
const router = Router();

router.get("/products", async (req, res) => {
    const products = await manager.consultarProductos(req.query)
    res.json({ products })
})

router.get("/products/:pid", async (req, res) => {
    const productfind = await manager.getProductsById(req.params);
    res.json({ status: "success", productfind });
})

router.post("/products", async (req, res) => {
    const newproduct = await manager.addProduct(req.body);
    res.json({ status: "success", newproduct });
})

router.put("/products/:pid", async (req, res) => {
    const updatedproduct = await manager.updateProduct(req.params, req.body);
    res.json({ status: "success", updatedproduct });
})


router.delete("/products/:pid", async (req, res) => {
    const id = parseInt(req.params.pid)
    const deleteproduct = await manager.deleteProduct(id);
    res.json({ status: "success", deleteproduct });
})


export default router; 