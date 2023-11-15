import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';
import { privateAcces } from '../middlewares/auth.js';

const router = Router()

const manager = new CartController()


router.get('/', manager.getAllCarts)

router.get('/:cid', manager.getCartById)

router.post('/', manager.createCart)

router.post('/:cid', manager.addProductToCart)

router.get('/:cid/purchase', privateAcces, manager.finalizeCartPurchase);

router.put('/:cid/products/:pid', privateAcces, manager.updateProductQuantityInCart)

router.put('/:cid', privateAcces, manager.updateProductList)

router.delete('/:cid/product/:pid', privateAcces, manager.deleteProductInCart)

router.delete('/:cid', privateAcces, manager.emptyCart)

export default router