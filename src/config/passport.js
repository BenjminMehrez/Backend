import passport from "passport";
import LocalStrategy from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import { usersService } from "../dao/index.js";
import githubStrategy from "passport-github2";
import { config } from "./config.js";

export const initializePassport = ()=>{
    passport.use("signupStrategy", new LocalStrategy(
        {
            usernameField:"email",
            passReqToCallback:true,
        },
        async (req, username, password, done)=>{
            try {
                const {first_name} = req.body;
                const user = await usersService.getByEmail(username);
                if(user){
                    return done(null, false)
                }
                const newUser = {
                    first_name:first_name,
                    email: username,
                    password:createHash(password)
                }
                const userCreated = await usersService.save(newUser);
                return done(null,userCreated)
            } catch (error) {
                return done(error)
            }
        }
    ));

    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField:"email"
        },
        async(username, password, done)=>{
            try {
                const user = await usersService.getByEmail(username);
                if(!user){
                    return done(null, false)
                }
                if(isValidPassword(user,password)){
                    return done(null,user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("githubLoginStrategy", new githubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clienteSecret,
            callbackUrl: config.github.callbackUrl
        },
        async(accesstoken,refreshToken,profile,done)=>{
            try {
                console.log("profile", profile);
                const user = await usersService.getByEmail(profile.username);
                if(!user){
                    const newUser = {
                        first_name: '',
                        email: profile.username,
                        password: createHash(profile.id)
                    };
                    const userCreated = await usersService.save(newUser);
                    return done(null,userCreated)
                } else {
                    return done(null,user)
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });

    passport.deserializeUser(async(id,done)=>{
        const user = await usersService.getById(id);
        done(null,user)
    });
}