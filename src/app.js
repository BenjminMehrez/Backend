import express from 'express';
import handlebars from 'express-handlebars';
import {__dirname} from './utils.js';
import { Server } from 'socket.io';

import productsRouter from './routes/products.js';
import viewsRouter from './routes/views.js';
import cartRouter from "./routes/carts.js";

import socketChat from "./listeners/socketChat.js";
import socketProducts from "./listeners/socketProducts.js";

import mongoose from 'mongoose';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use('/api/products', productsRouter);
app.use("/api/carts", cartRouter);
app.use('/', viewsRouter);

const connection = mongoose.connect('mongodb+srv://PracticaIntegradora:12344@cursobackend.aoxi4e7.mongodb.net/ecommerce')


const server = app.listen(8080, () => {
    console.log('Server arriva 8080');
})

const socketServer = new Server(server)

socketProducts(socketServer)
socketChat(socketServer)