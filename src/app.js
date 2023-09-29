import express from 'express';
import handlebars from 'express-handlebars';
import { connectDB } from "./config/server.js";
import {__dirname} from './utils.js';
import { Server } from 'socket.io';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import productsRouter from './routes/products.js';
import viewsRouter from './routes/views.js';
import cartRouter from "./routes/carts.js";

import socketChat from "./listeners/socketChat.js";
import socketProducts from "./listeners/socketProducts.js";
import {sessionsRouter} from "./routes/sessions.js";
import { config } from "./config/config.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


// app.use('/api/products', productsRouter);
// app.use("/api/carts", cartRouter);
// app.use('/', viewsRouter);


const server = app.listen(8080, () => {
    console.log('Server arriva 8080');
})

const socketServer = new Server(server)

socketProducts(socketServer)
socketChat(socketServer)

connectDB()

app.use(session({
    store:MongoStore.create({
        mongoUrl:config.mongo.url
    }),
    secret:config.server.secretSession,
    resave:true,
    saveUninitialized:true
}));


app.use('/', viewsRouter);
app.use("/api/sessions", sessionsRouter);


