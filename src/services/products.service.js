import { ProductManager } from '../dao/mongomanagers/productMongo.js';
const manager = new ProductManager();
export class ProductService{
    static categories = async()=>{
        return await manager.categories();
    }
    static getProducts = async({ category }, options)=>{
        return await manager.consultarProduct({ category }, options);
    }
    static getProductByID = async(pid)=>{
        return await manager.getProductById(pid);
    }
    static addProduct = async(obj)=>{
        return await manager.addProduct(obj);
    }
    static updateProduct = async(pid,obj)=>{
        return await manager.updateProduct(pid,obj);
    }
    static deleteProduct = async(id)=>{
        return await manager.deleteProduct(id);
    }
    
}