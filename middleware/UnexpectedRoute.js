const { CreateError } = require("./ErrorHandler")


const UnExpectedRouteHandler =(req,res,next)=>{
   next(CreateError(404,"Page Not Found"));
}

module.exports = UnExpectedRouteHandler;