export const UserAuthenticated = (req,res,next)=>{
    console.log(req.session);
    if(req.session?.userInfo){
        next();
    } else {
        res.redirect("/login");
    }
};

export const LoginView = (req,res,next)=>{
    console.log(req.session);
    if(req.session?.userInfo){
        res.redirect("/profile");
    } else {
        next();
    }
};