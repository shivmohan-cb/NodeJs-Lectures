const express = require("express");
const UnexpectedRouteHandler = require("./unexpectedRoute");
const logger = require("./logger");
const { ErrorHandler , CreateError } = require("./errorHandler");

const app = express();

//application level middleware for maintaining log request
app.use(logger);

let mypassword = 123456;
app.get("/get/:password",(req,res,next)=>{
   let password = req.params.password;
    if(password==mypassword) res.send("Application Level GET request succssfull recieved");
    else next(CreateError(401,"Do not type it again"));
   
})
app.post("/post",(req,res)=>{
    res.send("Application Level POST request");
})
app.put("/put",(req,res)=>{
    res.send("Application Level PUT request");
})
app.patch("/patch",(req,res)=>{
    res.send("Application Level PATCH request");
})
app.delete("/delete",(req,res)=>{
    res.send("Application Level DELETE request");
})


// Application level middle ware for unExpectedRoute Handling
app.use(UnexpectedRouteHandler);

// application level error handler to send error response
app.use(ErrorHandler);

const port = 3333;

app.listen(port,(err)=>{
    if(err) console.log(err);
    else console.log(`server is running on port : ${port}`);
});