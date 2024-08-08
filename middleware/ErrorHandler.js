const CreateError=(status,message)=>{
 let error = new Error();//creating error instance
 error.status = status;// creating new key in error object, status and storing status code in it
 error.message = message;// creating new key in error object, message and storing error message in it
 return error;// returning the error with status code and message
}


const ErrorHandler = (err,req,res,next)=>{
   let status = err.status || 500;
   let message = err.message || "Internal Server Error";
   res.status(status);
   res.send(message);
}


module.exports = {
    CreateError,
    ErrorHandler
}