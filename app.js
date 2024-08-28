const express = require("express");
const todo = require("./todoRouter");
const app = express();
const session = require("express-session");
const auth = require("./authRouter");
const { ErrorHandler } = require("./middleware/errorHandler");
const isAuth = require("./middleware/isAuth");
const TodoDB = require("./TodoDB.json");
const user = require("./userRouter");

app.use(express.urlencoded({extended:false}));
//session
app.use(session({
    secret:"secret",
    resave: false,
    saveUninitialized: false,
    cookie :{
        maxAge: 1000 * 60 * 60// session for one
    }
}))

app.use("/auth",auth);
app.use("/user",user);
app.use("/todo",todo);

app.get("/",isAuth,(req,res)=>{
 let userId = req.session.user.id;
 let todos = TodoDB;
 let userTodoList = todos[userId]// selecting the specific user todo list based on user id
 res.send(userTodoList);
});

app.use(ErrorHandler);

const port = 2000;
app.listen(port ,(err)=>{
 if(err) console.log(err);
 else console.log(`Server is running on port : ${port}`);
});
