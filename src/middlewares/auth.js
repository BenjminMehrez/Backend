import UsersManager from "../persistencia/dao/mongomanagers/userMongo.js";

const manger = new UsersManager();

export const publicAcces = (req,res,next) =>{
    if(req.session.username) return res.redirect('/current');
    next();
}

export const privateAcces = (req,res,next)=>{
    if(!req.session.username) return res.redirect('/login');
    next();
}

export const adminAccess = async (req, res, next) => {

    if (!req.session.username) return res.redirect('/login');
  
    const user = await manger.findUser(req.session.username);

    if (user.role !== 'admin') return res.status(403).send('Forbidden');

    next();
};

export const userAccess = async (req, res, next) => {

    if (!req.session.username) return res.redirect('/login');

    const user = await manger.findUser(req.session.username);

    if (user.role !== 'user') return res.status(403).send('Forbidden');

    next();
};
