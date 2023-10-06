import express from 'express';
import { config } from "./config/config.js";
import handlebars from 'express-handlebars';
import {__dirname} from './utils.js';
import path from 'path';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { initializePassport } from "./config/passport.js";
import passport from 'passport';
import { connectDB } from "./config/server.js";
import { Server } from 'socket.io';

import productsRouter from './routes/products.js';
import viewsRouter from './routes/views.js';
import cartRouter from "./routes/carts.js";

import socketChat from "./listeners/socketChat.js";
import socketProducts from "./listeners/socketProducts.js";
import {sessionsRouter} from "./routes/sessions.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,"/views"));


// app.use('/api/products', productsRouter);
// app.use("/api/carts", cartRouter);
// app.use('/', viewsRouter);


const server = app.listen(8080, () => {
    console.log('Server arriva 8080');
})


initializePassport();
app.use(passport.initialize());
app.use(passport.session());


const socketServer = new Server(server)

socketProducts(socketServer)
socketChat(socketServer)


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


