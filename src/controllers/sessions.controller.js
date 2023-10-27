export class SessionsController{

    static redirectLogin = (req,res)=>{
        res.redirect("/profile");
    }
    static signup = (req,res)=>{
        res.render("login",{message:"Usuario Registrado exitosamente"});
    }
    static failSignup = (req,res)=>{
        res.render("signup",{error:"Error usuario no registrado"});
    }
    static failLogin = (req,res)=>{
        res.render("login",{error:"Error"});
    }
    static changePassword = async(req,res)=>{
        try {
            const form = req.body;
            const user = await usersService.getByEmail(form.email);
            if(!user){
                return res.render("changePassword",{error:"No se pudo cambiar la contraseña"});
            }
            user.password = createHash(form.newPassword);
            console.log(user);
            await usersService.update(user._id,user);
            return res.render("login",{message:"Contraseña cambiada"})
        } catch (error) {
            res.render("changePassword",{error:error.message});
        }
    }
    static loginGitHub = (req,res)=>{
        res.redirect("/profile");
    }
    static logout = (req,res)=>{
        req.logOut(error=>{
            if(error){
                return res.render("profile",{user: req.user, error:"No se pudo cerrar la sesion"});
            } else {
                req.session.destroy(error=>{
                    if(error) return res.render("profile",{user: req.session.userInfo, error:"No se pudo cerrar la sesion"});
                    res.redirect("/");
                })
            }
        })
    }
}