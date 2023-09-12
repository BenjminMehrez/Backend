import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import productsRouter from './routes/products.js';
import viewsRouter from './routes/views.js';
import cartRouter from "./routes/carts.js";
import ProductManager from "./dao/mongomanagers/productMongo.js";
import MessagesManager from "./dao/mongomanagers/messageMongo.js";
import mongoose from 'mongoose';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

const connection = mongoose.connect('mongodb+srv://PracticaIntegradora:12344@cursobackend.aoxi4e7.mongodb.net/ecommerce')

app.use('/api', productsRouter);
app.use("/api", cartRouter);
app.use('/', viewsRouter);


const server = app.listen(8080, () => {
    console.log('Server arriva 8080');
})

const io = new Server(server);

const manager = new ProductManager(__dirname + '/files/productos.json');
const messagesManager = new MessagesManager();


io.on("connection", async (socket) => {
    console.log("client connected con ID:", socket.id)
    const listadeproductos = await manager.consultarProductos({})
    io.emit("enviodeproducts", listadeproductos)

    socket.on("addProduct", async (obj) => {
        await manager.addProduct(obj)
        const listadeproductos = await manager.consultarProductos()
        io.emit("enviodeproducts", listadeproductos)
    })

    socket.on("deleteProduct", async (id) => {
        console.log(id)
        await manager.deleteProduct(id)
        const listadeproductos = await manager.consultarProductos({})
        io.emit("enviodeproducts", listadeproductos)
    })

    socket.on("nuevousuario", (usuario) => {
        console.log("usuario", usuario)
        socket.broadcast.emit("broadcast", usuario)
    })
    socket.on("disconnect", () => {
        console.log(`Usuario con ID : ${socket.id} esta desconectado `)
    })

    socket.on("mensaje", async (info) => {
        console.log(info)
        await messagesManager.createMessage(info);
        socketServer.emit("chat", await messagesManager.getMessages());
    });

})