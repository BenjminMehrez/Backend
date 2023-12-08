import ProductManager from "../persistencia/dao/mongomanagers/productMongo.js";
import ProductController from '../controllers/product.controller.js'

const pm = new ProductManager()
const pc = new ProductController()

const socketProducts = (socketServer) => {
    socketServer.on("connection", async (socket) => {
        console.log("client connected con ID:", socket.id)
        const listadeproductos = await pm.getProductsView()
        socketServer.emit("enviodeproducts", listadeproductos)

        socket.on("addProduct", async (obj) => {
            await pc.addProduct(obj)
            const listadeproductos = await pm.getProductsView()
            socketServer.emit("enviodeproducts", listadeproductos)
        })

        socket.on("deleteProduct", async (id) => {
            console.log(id)
            await pc.deleteProduct(id)
            const listadeproductos = await pm.getProductsView()
            socketServer.emit("enviodeproducts", listadeproductos)
        })

        socket.on("nuevousuario", (usuario) => {
            socket.broadcast.emit("broadcast", usuario)
        })
        socket.on("disconnect", () => {
            console.log(`Usuario con ID : ${socket.id} esta desconectado `)
        })


    })
};

export default socketProducts;