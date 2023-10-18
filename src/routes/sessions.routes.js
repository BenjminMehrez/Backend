import { Router } from "express";
import { usersService } from "../dao/index.js";
import { createHash, passportCall, authorization } from "../utils.js";
import passport from "passport";
import jwt from "jsonwebtoken";


const router = Router();

router.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect: "/api/sessions/fail-signup"
}), (req, res) => {
    res.render("login", { message: "usuario registrado" });
});

router.get("/fail-signup", (req, res) => {
    res.render("signup", { error: "No se pudo registrar el usuario" });
});

router.post('/login', passport.authenticate('loginStrategy', {session: false, failureRedirect: '/api/sessions/failedLogin'}), (req,res)=> {
    const serializedUser = {
        id: req.user._id,
        name: `${req.user.first_name} ${req.user.last_name}`,
        role: req.user.role,
        email: req.user.email
    }
    const token = jwt.sign(serializedUser, 'coderSecret', {expiresIn: '1h'})
    res.cookie('coderCookie', token, {maxAge: 3600000}).send({status:"success", payload: serializedUser});
})

router.get('/current',passportCall('jwt'), authorization('user'), (req, res)=> {

    res.send(req.user);
})

router.get("/fail-login", (req, res) => {
    res.render("login", { error: "Credenciales invalidas" });
});

router.post("/changePass", async (req, res) => {
    try {
        const form = req.body;
        const user = await usersService.getByEmail(form.email);
        if (!user) {
            return res.render("changePassword", { error: "No es posible cambiar la contraseña" });
        }
        user.password = createHash(form.newPassword);
        console.log(user);
        await usersService.update(user._id, user);
        return res.render("login", { message: "Contraseña restaurada" })
    } catch (error) {
        res.render("changePassword", { error: error.message });
    }
});

router.get("/loginGithub", passport.authenticate("githubLoginStrategy"));


router.get("/github-callback", passport.authenticate("githubLoginStrategy", {
    failureRedirect: "/api/sessions/fail-signup"

}), (req, res) => {
    res.redirect("/profile");
});

router.get("/logout", (req, res) => {
    req.logOut(error => {
        if (error) {
            return res.render("profile", { user: req.user, error: "No se pudo cerrar la sesion" });
        } else {
            req.session.destroy(error => {
                if (error) return res.render("profile", { user: req.session.userInfo, error: "No se pudo cerrar la sesion" });
                res.redirect("/");
            })
        }
    })
});

export { router as sessionsRouter };