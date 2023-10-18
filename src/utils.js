import bcrypt from "bcrypt";
import path from 'path';
import multer from "multer";
import passport from "passport";
import { fileURLToPath } from 'url';
export const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/public/images`)
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


export const uploader = multer({
    storage, onError: function (err, next) {
        console.log(err);
        next();
    }
});


export const createHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
};

export const isValidPassword = (userDB,password)=>{
    return bcrypt.compareSync(password,userDB.password);
}

export const cookieExtractor = req => {
    let token;
    if (req && req.cookies) {
        token = req.cookies['coderCookie']
    }
    return token;
}

export const bearerTokenExtractor = req => {
    return req.headers.authorization.split(' ')[1];
}

export const passportCall = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({error: info.messages ? info.messages: info.toString()})
            }
            req.user = user;
            next();
        }) (req, res, next);
    }
}

export const authorization = (role) => {
    return async(req, res, next)=> {
        if (!req.user) {
            return res.status(401).send({error: 'Unauthorized'});
        }
        if (req.user.role != role) {
            return res.status(403).send({error: 'No permissions'});
        }
        next();
    }
}
