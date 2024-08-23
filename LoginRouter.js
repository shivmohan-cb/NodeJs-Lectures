const express = require("express");
const  LoginRouter = express.Router();
const path = require("path");
const UserDB = require("./UserDB.json");
const fs = require("fs");
const isAuth = require("./middleware/isAuth");

LoginRouter.get('/register',(req,res)=>{
    res.sendFile("Register.html",{root:path.join(__dirname)});
});

LoginRouter.post("/register",(req,res)=>{
  let {name, email, password } = req.body;
  let userOBJ = {
    id: new Date().getTime(),
    name,email,password
  }
 let Database = UserDB;
 Database.push(userOBJ);
 fs.writeFile("UserDB.json",JSON.stringify(Database),(err)=>{
  if(err) res.send("Internal server error");
  else res.send("User Created Successfully");
 });
});

LoginRouter.get("/login",isAuth,(req,res)=>{
  res.sendFile("Login.html",{root:path.join(__dirname)});
});

LoginRouter.post("/login",(req,res)=>{
   let {email, password} = req.body;
   let database = UserDB;
   let index = database.findIndex((elm)=>elm.email.toLowerCase() == email.toLowerCase());
   if(index >= 0){
     if(database[index].password == password){
        // create a login session
          req.session.user = database[index] // created a session for this user;
          res.send(`${database[index].email} is Logged in`);
     }else {
        res.send("Wrong Password");
     }
   }else {
    res.send("User Not Found");
   }
});

LoginRouter.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
    if(err) res.send("Error while logout");
    else res.send("Logged Out Successfully");
    });
});

module.exports = LoginRouter;