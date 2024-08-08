const db = require("../db.json");
const { CreateError } = require("./ErrorHandler");

const isUsrPrsnt =(req,res,next)=>{
  let id = req.params.id;// accessing id from parameter
  let database = db;
  let index = database.findIndex((elm)=>elm.id==id )//index || -1
  
  if(index>=0){ // if user present 
    req.user = database[index];//storing existing user object in req object
    next();// calling next route handler
  }else {// if user not present
    next(CreateError(404,"User Not Found"));// responding error message
  }
}

module.exports = isUsrPrsnt;