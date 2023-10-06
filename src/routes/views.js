import { Router } from 'express';
import ProductManager from "../dao/mongomanagers/productMongo.js";
import { UserAuthenticated, LoginView } from "../middlewares/auth.js";

const manager = new ProductManager();

const router = Router();

router.get("/products",async(req,res)=>{
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

router.get("/registro", LoginView,(req,res)=>{
    res.render("signup");
});

router.get("/", LoginView, (req,res)=>{
    res.render("login");
});

router.get("/password", LoginView, (req,res)=>{
    res.render("password");
});

router.get("/profile", UserAuthenticated, (req,res)=>{
    console.log(req.session);
    res.render("profile",{user: req.session.userInfo});
});


export default router;