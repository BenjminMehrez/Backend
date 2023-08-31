import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import productsRouter from './routes/products.js';
import viewsRouter from './routes/views.js';
import ManagerProduct from './managers/managerProduct.js';

const app = express(); 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars' , handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use('/api', productsRouter);
app.use('/', viewsRouter);

const server = app.listen(8080, () => {
    console.log('Server arriva 8080');
})

const io = new Server(server);

const manager = new ManagerProduct(__dirname + '/files/productos.json');

io.on("connection",async(socket)=>{
    console.log("client connected con ID:",socket.id)
    const listadeproductos=await manager.consultarProductos({})
    io.emit("enviodeproducts",listadeproductos)

    socket.on("addProduct",async(obj)=>{
    await manager.addProduct(obj)
    const listadeproductos=await manager.consultarProductos({})
    io.emit("enviodeproducts",listadeproductos)
    })

    socket.on("deleteProduct",async(id)=>{
        console.log(id)
        await manager.deleteProduct(id)
        const listadeproductos=await manager.consultarProductos({})
        io.emit("enviodeproducts",listadeproductos)
        })
    
})