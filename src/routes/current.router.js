import { Router } from "express";
import UsersManager from '../persistencia/dao/mongomanagers/userMongo.js'
import {privateAcces} from '../middlewares/auth.js'
const um = new UsersManager()
const router = Router()

router.get('/current', privateAcces, async (req, res) => {
    const user = await um.findUser(req.session.username)
    const newUser = {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      age: user.age,
      role: user.role,
    };
    res.render('current', { user: newUser, style: 'styles.css' });
});


export default router