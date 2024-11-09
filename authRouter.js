const auth = require("express").Router();
const userDB = require("./UserDb.json");
const jwt = require("jsonwebtoken");

auth.post("/login",(req,res)=>{
let email = req.body.email;
let password = req.body.password;
let find = userDB.find((elm)=>elm.email.toLowerCase() == email.toLowerCase())
if(password === find.password) {
  const token = jwt.sign(find,"1234554321",{expiresIn: "1hr"});
  res.send({
    message: "token Generated Successfully",
    token:token
   });
}
else {
    res.send({message: "user Not found"});
}
})

module.exports = auth;