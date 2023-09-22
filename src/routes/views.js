import { Router } from 'express';
import ProductManager from "../dao/mongomanagers/productMongo.js";


const manager = new ProductManager();

const router = Router();

router.get("/",async(req,res)=>{
    const listadeproductos=await manager.getProductsView({})
    console.log(listadeproductos)
    res.render("home",{listadeproductos})
})

router.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts")
})

router.get("/chat",(req,res)=>{
    res.render("chat")
})



export default router;