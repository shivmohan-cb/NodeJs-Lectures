const express = require("express");
const path = require("path");
const userRouter = express.Router();
const db = require("./db.json");
const multer = require("multer");
const fs = require("fs");

const userImage = multer({dest:"userImages/"});

userRouter.get("/register",(req,res)=>{
res.sendFile("registerUser.html",{root:path.join(__dirname)});
})

userRouter.post("/register",userImage.single("image"),(req,res)=>{
 let userImage = req.file;
 let {name,email,password} = req.body;
 let database = db;
 let newUser = {
    name,
    email,
    password,
    imageUrl : userImage.path
 }

 database.push(newUser);
 fs.writeFile("db.json",JSON.stringify(database),(err)=>{
  if(err) console.log(err)
    else res.send(newUser);
 })

});

module.exports = userRouter;