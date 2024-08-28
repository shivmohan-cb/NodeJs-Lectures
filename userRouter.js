const user = require("express").Router();
const path = require("path");
const TodoDB = require("./TodoDB.json");//{}
const multer = require("multer");
const option = { root: path.join(__dirname, "public") }

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "userImage/");
   },
   filename: (req, file, cb) => {
      let filename = file.originalname;
      cb(null, filename);
   }
});

const singleUpload = multer({
   storage: storage
}).single("image");

user.get("/register", (req, res) => {
   // send register form
   res.sendFile("Register.html", option);
})

user.post("/register", singleUpload, (req, res, next) => {
   // acsess register form data 
   let domainName = "localhost:2000/";
   let file = req.file;
   let { name, email, password } = req.body;
   let database = UserDB;
   let index = database.findIndex((elm) => elm.email.toLowerCase() == email.toLowerCase());
   if (index >= 0) {
      res.send({
         email,
         message: "User Is already Present, Use another email"
      });
   } else {
      let newUser = {
         id: new Date().getTime(),
         name, email, password,
         image: domainName + file.originalname
      }
      database.push(newUser);
      fs.writeFile("UserDB.json", JSON.stringify(database), (err) => {
         if (err) next(err);
         else {
            // res.send({name: name, message: "New User Created"})
            // initializing a todo list for this new user
            let todoDB = TodoDB;//{}
            todoDB[newUser.id] = [];// initializing a todo list for user id
            fs.writeFile("TodoDB.json", JSON.stringify(todoDB), (err) => {
               if (err) next(err);
               else {
                  res.send({ name: name, message: "New User Created" });// user created with todo list
                  // res.redirect("/user/login");//redirect to the login page
               }
            })
         }
      })
   }

});


module.exports = user;