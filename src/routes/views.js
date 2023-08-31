import { Router } from 'express';
import ManagerProduct from "../managers/managerProduct.js";
import  __dirname  from "../utils.js";

const manager = new ManagerProduct(__dirname + '/files/productos.json')

const router = Router();

router.get("/",async(req,res)=>{
    const listadeproductos=await manager.consultarProductos({})
    console.log(listadeproductos)
    res.render("home",{listadeproductos})
})

router.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts")
})


export default router;