const CreateError = (status,message) => {
 let error = new Error();
 error.status = status;
 error.message = message;
 return error;
}

const ErrorHandler = (err,req,res,next)=>{
  let status = err.status ? err.status : 500;
  let message = err.message ? err.message : "Internal Sever Error"
  res.send({status,message});
}

module.exports = {
    CreateError, ErrorHandler
}