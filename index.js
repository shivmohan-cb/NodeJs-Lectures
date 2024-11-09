const express = require("express");
const jwt  = require("jsonwebtoken");
const app = express();
const data = require("./UserDb.json");
const JWTverify = require("./JwtVerify");
const auth = require("./authRouter");

app.use(express.urlencoded({extended: false}));
app.use("/auth",auth);

let user1 = data[0];// user details

const token =  jwt.sign(user1, 'something secret', {expiresIn : "1h"}); // jwt generated

app.get("/",(req,res)=>{
res.send(token);
console.log(token);
});

app.get("/verify",JWTverify,(req,res)=>{
   res.send({
    message: "User Verified Successfully", 
    user:req.verifiedUser
 });
});

let port = 1234;
app.listen(port,(err)=>{
console.log(err? err : `server is running on port : ${port}`);
});