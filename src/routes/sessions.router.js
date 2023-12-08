import { Router } from 'express';
import LoginController from '../controllers/login.controller.js';
import passport from 'passport';

const router = Router()
const lc = new LoginController();


router.get('/'), async (req, res) => {
    res.redirect('/register');
}

router.post('/register', lc.createUser)

router.post('/login', lc.loginUser)

router.get('/logout', lc.LogoutUser)

router.get(
    "/githubSignup",
    passport.authenticate("github", { scope: ["user:email"] })
);


router.get(
    "/github",
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        req.session['username'] = req.user.username
        res.redirect('/current');
    });

router.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
});

router.get('/reset-success', (req, res) => {
    res.render('reset-success');
});

router.post('/forgot-password', lc.startPasswordReset);

router.get('/reset-password/:token', lc.findUserByResetToken);

router.post('/reset-password/:token', lc.resetPassword);

router.post('/premium/:uid', lc.changeUserRole)




export default router