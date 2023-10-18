import {ProductManager} from "./mongomanagers/productMongo.js";
import CartManager from "./mongomanagers/cartMongo.js";
import { connectDB } from "../config/Server.js";
import { UsersMongo } from "./mongomanagers/usersMongo.js";

connectDB();

const productService = new ProductManager();
const cartService = new CartManager();
const usersService = new UsersMongo();

export {productService, cartService, usersService}
