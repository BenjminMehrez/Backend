import express from 'express';
import { config } from "./config/config.js";
import { engine } from 'express-handlebars';
import path from "path";
import { __dirname } from "./utils.js"
import session from "express-session";
import MongoStore from "connect-mongo";
import { initializePassport } from "./config/passport.js";
import passport from "passport";
import { viewsRouter }   from "./routes/views.js";
import { sessionsRouter } from "./routes/sessions.routes.js";

import { Server } from 'socket.io';
import {connectDB} from "./config/server.js"

import socketProducts from "./listeners/socketProducts.js"
import socketChat from './listeners/socketChat.js';



const PORT = config.server.port;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const httpServer = app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\n`);
    }
    catch (err) {
        console.log(err);
    }
});

app.engine('handlebars', engine({extname: 'handlebars'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,"/views"));


app.use(session({
    store:MongoStore.create({
        mongoUrl:config.mongo.url
    }),
    secret:config.server.secretSession,
    resave:true,
    saveUninitialized:true
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


const socketServer = new Server(httpServer)

socketProducts(socketServer)
socketChat(socketServer)


app.use(viewsRouter);
app.use("/api/sessions", sessionsRouter);

