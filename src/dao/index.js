import  ProductManagerMongo  from "./mongomanagers/productMongo.js";
import  CartManagerMongo  from "./mongomanagers/cartMongo.js";
import { connectDB } from "../config/server.js";
import { UsersMongo } from "./mongomanagers/usersMongo.js";


connectDB();

const productService = new ProductManagerMongo();
const cartService = new CartManagerMongo();
const usersService = new UsersMongo();

export {productService, cartService, usersService}
