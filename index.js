const express = require("express");
const { ErrorHandler } = require("./middleware/ErrorHandler");
const validate = require("./middleware/validations");
const db= require("./db.json");
const fs = require("fs");
const isUsrPrsnt = require("./middleware/isUserPresent");
const isAuth = require("./middleware/auth");
const UnExpectedRouteHandler = require("./middleware/UnexpectedRoute");
// const RouteHandler = require("./argumentControl");
const app = express();

// application level middle ware
app.use(express.urlencoded({extended:false}));// converting urlencoded data to json object and storing it into req.body
// RouteHandler("Err","request","response","next");

// Create
app.post("/signup",validate,(req,res,next)=>{
   let newUser = req.newUser; // new user
   let database = db;// database
   database.push(newUser);// pushing new user to the database
    // re-writing db.json file with new user
   fs.writeFile("db.json",JSON.stringify(database),(err)=>{
    if(err) next(err);
    else {
        res.status(201);
        res.send(`User Created with user ID : ${newUser.id}`)
    }
   })
});

// Read
app.get("/user/:id",isUsrPrsnt,isAuth,(req, res) => {
    let user = req.user;
    res.send(user);
});

// Update
app.put("/user/:id",(req,res)=>{// user present and password check middle ware
// write code for update
});

// Delete
app.delete("/delete/:id",isUsrPrsnt,isAuth,(req,res)=>{
    let database = db;
  let user = req.user;
  let filter = database.filter((elm)=> elm.id!=user.id );
  fs.writeFile("db.json",JSON.stringify(filter),(err)=>{
   if(err) next(err);
   else {
     res.status(200);
     res.send(`${user.id} is removed from database`);
   }
  })
})



//Application Level Middlewares
app.use(UnExpectedRouteHandler);//application level middleware : unexpected route handler
app.use(ErrorHandler);// application level middleware : Error Handler

const port = 4567;
app.listen(port,(err)=>{
 if(err) console.log(err);
 else console.log(`Server is runnig on PORT : ${port}`);
})
