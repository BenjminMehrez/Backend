import { Router } from 'express';
import {premiumOrAdminAccess, adminAccess} from '../middlewares/auth.js'
const router = Router()

import ProductController from '../controllers/product.controller.js';

const pc = new ProductController();


router.get('/', pc.getAllProducts)

router.get('/:pid', pc.getProduct)

router.post('/', premiumOrAdminAccess, pc.addProduct)

router.put('/:pid', premiumOrAdminAccess, pc.updateProduct)

router.delete('/:pid', adminAccess, pc.deleteProduct)

router.get('/mockingproducts')

export default router