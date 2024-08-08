function CreateError(status,message){
    let error = new Error();
    error.status = status;// status code 
    error.message = message;// message for res.send
    return error;
}

function ErrorHandler(err,req,res,next){
  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";  
  res.status(statusCode);
  res.send(message)
}

module.exports = {
    ErrorHandler,
    CreateError
};