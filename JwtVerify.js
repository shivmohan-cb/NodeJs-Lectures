const jwt = require("jsonwebtoken");
const userDB = require("./UserDb.json");

const JWTverify = (req,res, next)=>{
let email = req.body.email;
let password = req.body.password;
let token = req.body.token;

let find = userDB.find((elm)=>elm.email.toLowerCase() == email.toLowerCase())
if(password === find.password) {
   jwt.verify(token,"1234554321",(err,decode)=>{
       if(err) res.send({message: "unAuthorised",status: 401})
        else {
                req.verifiedUser = decode;// storing user after jwt verification
                next();
    }
  });
//   res.send({message: "User Verified Successfully", user:verifiedUser});

}else {
    res.send({messsage: "user Not found",status: 404});
}
}

module.exports = JWTverify;