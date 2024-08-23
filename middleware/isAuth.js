
const isAuth = (req,res,next)=>{
   if(req.session.user){
     res.send(`${req.session.user.email} is logged in`);
   }else {
    // res.redirect("/user/login");
    next();
   }
}

module.exports = isAuth;