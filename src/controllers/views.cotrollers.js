import {ProductManager} from '../dao/mongomanagers/productMongo.js'

const manager = new ProductManager();

export class ViewController {
    static renderHome = (req, res) => {
        const listadeproductos = manager.getProductsView()
        res.render("realtimeproducts");
    }

    static rendeRealTimeProducts = (req, res) => {
        res.render("realtimeproducts");
    }

    static renderChat = (req, res) => {
        res.render("chat");
    }

    static renderRegistro = (req, res) => {
        res.render("signup");
    }

    static renderLogin =  (req, res) => {
        res.render("login");
    }

    static renderCambioPassword = (req, res) => {
        res.render("changePassword");
    }

    static renderProfile = (req, res) => {
        res.render("profile", { user: req.user });
        
    }


}