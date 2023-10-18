import { Router } from 'express';
import { ProductManager } from "../dao/mongomanagers/productMongo.js";
import { UserAuthenticated, LoginView } from "../middlewares/auth.js";

const manager = new ProductManager();

const router = Router();


router.get("/", (req, res) => {
    const listadeproductos = manager.consultarProduct()
    res.render("home");
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts");
});

router.get("/chat", (req, res) => {
    res.render("chat");
});

router.get("/registro", LoginView, (req, res) => {
    res.render("signup");
});

router.get("/login", LoginView, (req, res) => {
    res.render("login", {});
});

router.get("/cambio-password", LoginView, (req, res) => {
    res.render("changePassword");
});

router.get("/profile", UserAuthenticated, (req, res) => {
    console.log(req.user);
    
    res.render("profile", { user: req.user });
    
});

export {router as viewsRouter};
