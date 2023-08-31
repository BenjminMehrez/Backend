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


app.use('/api/products', productsRouter);
app.use('/realtimeproducts', viewsRouter);

const server = app.listen(8080, () => {
    console.log('Server arriva 8080');
})

const io = new Server(server);

const manager = new ManagerProduct();

io.on('connection', socket => {
    console.log('Connection on');

    socket.on('product', async (data) => {
        console.log('Soy data:', data);
        await manager.addProduct( data.title, data.description, data.price, data.thumbnails, data.status, data.code, data.stock );

        const productos = await manager.consultarProductos();
        io.emit('allProduct', productos);
    })
})