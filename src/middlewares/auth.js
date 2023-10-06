export const UserAuthenticated = (req,res,next)=>{
    if(req.user){
        next();
    } else {
        res.redirect("/login");
    }
};

export const LoginView = (req,res,next)=>{
    if(req.user){
        res.redirect("/profile");
    } else {
        next();
    }
};