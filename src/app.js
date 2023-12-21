import express from "express";
import handlebars from 'express-handlebars';
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import logger from "./winston.js"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from 'swagger-ui-express';
import passport from 'passport';

import { Server } from 'socket.io';
import config from './config/config.js';
import './config/server.js';
import './config/passport.js'
import { __dirname } from "./utils.js";

import viewsRouter from './routes/views.js';
import cartsRouter from './routes/carts.js';
import productsRouter from './routes/products.js';
import loginRouter from './routes/sessions.router.js';
import currentRouter from './routes/current.router.js';
import {generateFakeProduct} from './Mocks/productMock.js'

//socketservers
import socketCart from "./listeners/socketCart.js";
import socketProducts from "./listeners/socketProducts.js"
import socketChat from './listeners/socketChat.js';

const app = express();
const PORT = config.port;
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentacion del poder y del saber',
            description: 'Api pensada para clase de Swagger'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}


app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJSDoc(swaggerOptions)));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')

app.use(cookieParser('Benjamin'))


app.use(session({
    store: new MongoStore({
        mongoUrl: config.mongoUrl
    }),
    secret: config.session_secret,
    cookie: {maxAge:1200000}
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',viewsRouter)
app.use('/api/auth',loginRouter)
app.use('/api/carts',cartsRouter)
app.use('/api/products',productsRouter)
app.use('/api/current',currentRouter)

app.get('/api/mockingproducts', (req, res) => {
    const fakeProduct = [];
    for (let i = 0; i < 100; i++) {
        const productMock = generateFakeProduct(); 
        fakeProduct.push(productMock);
    }
    res.json(fakeProduct);
});

app.get('/api/loggerTest', (req, res) => {
    logger.debug('Mensaje de depuración en /loggerTest');
    logger.http('Mensaje HTTP en /loggerTest');
    logger.info('Mensaje de información en /loggerTest');
    logger.warning('Mensaje de advertencia en /loggerTest');
    logger.error('Mensaje de error en /loggerTest');
    logger.fatal('Mensaje fatal en /loggerTest');
    res.send('Pruebas de registros completadas');
});

const httpServer = app.listen(PORT)
console.log(`Escuchando al puerto ${PORT}`);

const socketServer = new Server(httpServer)

socketCart(socketServer)
socketProducts(socketServer)
socketChat(socketServer)