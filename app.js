const express = require("express");
const todo = require("./todoRouter");
const app = express();
const session = require("express-session");
const auth = require("./authRouter");
const { ErrorHandler } = require("./middleware/errorHandler");
const isAuth = require("./middleware/isAuth");
const TodoDB = require("./TodoDB.json");
const user = require("./userRouter");
const path = require("path");
const option = {root:path.join(__dirname,"public")}

app.use(express.static("public"));//

app.use(express.urlencoded({extended:false}));
app.use(express.json());
//session
app.use(session({
    secret:"secret",
    resave: false,
    saveUninitialized: false,
    cookie :{
        maxAge: 1000 * 60 * 60// session for one hour
    }
}))

app.use("/auth",auth);
app.use("/user",user);
app.use("/todo",todo);

app.get("/",isAuth,(req,res)=>{
//  let userId = req.session.user.id;
//  let todos = TodoDB;
//  let userTodoList = todos[userId]// selecting the specific user todo list based on user id
//  res.send(userTodoList);
res.sendFile("Home.html",option);
});

app.use(ErrorHandler);

const port = 2000;
app.listen(port ,(err)=>{
 if(err) console.log(err);
 else console.log(`Server is running on port : ${port}`);
});
