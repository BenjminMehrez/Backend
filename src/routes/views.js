import UserDTO from '../persistencia/dto/user.dto.js';
import UserReformed from '../persistencia/dto/reformeduser.dto.js';
import { Router } from 'express';
import ProductManager from "../persistencia/dao/mongomanagers/productMongo.js"
import UsersManager from "../persistencia/dao/mongomanagers/userMongo.js"
import { privateAcces, publicAcces, premiumOrAdminAccess, adminAccess } from '../middlewares/auth.js'

const productManager = new ProductManager()

const userManager = new UsersManager()

const router = Router()


router.get("/", async (req, res) => {
    res.render('login', {
        style: 'styles.css'
    })

})

router.get("/products", async (req, res) => {
    const listadeproductos = await productManager.getProductsView()
    res.render("products", { listadeproductos, style: 'styles.css' })
})

router.get("/realtimeproducts", premiumOrAdminAccess, (req, res) => {
    res.render("realtimeproducts", { style: 'styles.css' })
})

router.get("/chat", privateAcces, (req, res) => {
    res.render("chat", { style: 'chat.css' })
})

router.get("/register", publicAcces, (req, res) => {
    res.render("register", { style: 'styles.css' })
})

router.get("/login", publicAcces, (req, res) => {
    res.render("login", { style: 'styles.css' })
})

router.get('/current', privateAcces, async (req, res) => {
    const user = await userManager.findUser(req.session.username);
    if (user === null) {
        req.session.destroy(err => {
            if (err) return res.status(500).send({ status: "error", error: "No pudo cerrar sesion" })
            res.redirect('/login');
        })
    }
    const userDTO = new UserDTO(user);
    userDTO.isAdmin = user.role === 'admin' ? true : false;
    userDTO.isPremiumOrAdmin = user.role === 'admin' || user.role === 'premium' ? true : false;
    res.render('current', { user: userDTO, style: 'styles.css' });
});

router.get("/forgot-password", publicAcces, (req, res) => {
    res.render("forgot-password")
})

router.get("/reset-password", publicAcces, (req, res) => {
    res.render("reset-password")
})

router.get("/create-product-panel", premiumOrAdminAccess, (req, res) => {
    res.render("create-product-panel")
})

router.get("/:uid/documents", privateAcces, (req, res) => {
    res.render("uploadfiles")
})

router.get("/panel", adminAccess, async (req, res) => {
    const users = await userManager.getAllUsers()
    const userwithchanges = users.map(user => new UserReformed(user));
    res.render("paneladmin", { user: userwithchanges  })
})

export default router