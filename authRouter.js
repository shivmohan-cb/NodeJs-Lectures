const auth = require("express").Router();
const path = require("path");
const UserDB =require("./UserDB.json");//[]
const option = {root:path.join(__dirname,"public")}


auth.get("/login",(req,res)=>{
// send login form
if(req.session.user){
  res.redirect("/");
}
else res.sendFile("Login.html",option);

})

auth.post("/login",(req,res)=>{
// access login form data
 let {email,password} = req.body;
 let database = UserDB;
 let index = database.findIndex((elm)=>elm.email.toLowerCase()== email.toLowerCase());
 if(index>=0){
   if(database[index].password==password){
     // create Login session for user
     req.session.user = database[index];
    //  res.send({    email, message: "User Logged in"});
    res.redirect("/");//redirecting to home page
   }else {
    res.send({message: "Wrong Email or Password"})
   }

 }else{
   res.send({
    email: email,
    message: "User Not Found"
   })
 }

})

auth.get("/logout",(req,res,next)=>{
  // destroy login session
  req.session.destroy((err)=>{
   if(err) next(err);
   else {
    res.send({message:'User Logged Out Successfully'});
   }
  });
})

module.exports = auth;