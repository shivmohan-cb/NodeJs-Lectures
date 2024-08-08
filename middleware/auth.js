const { CreateError } = require("./ErrorHandler");



const isAuth = (req,res,next)=>{
  let user = req.user;
  let password = req.body.password;
  if(password==user.password){
     next();
  }
  else next(CreateError(401,"UnAuthorised Access"));
}


module.exports = isAuth;