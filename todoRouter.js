const todo = require("express").Router();
const TodoDB = require("./TodoDB.json");
const fs = require("fs");
const multer = require("multer");
const isAuth = require("./middleware/isAuth");
const path = require("path");
const option = {root:path.join(__dirname,"public")}

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
       cb(null,"public/todoImage/");
    },
    filename: (req,file,cb)=>{
      console.log(file);
       let filename = file.originalname.split(" ").join("-");
        cb(null,filename);
    }
});

const singleUpload = multer({
    storage: storage
}).single("image");


todo.get("/add",isAuth,(req,res)=>{
  // sending add item page 
   res.sendFile("AddTodo.html",option);
});

//Create todo - post
todo.post("/add",singleUpload,isAuth,(req,res,next)=>{
// create todo item
let domainName = "http://localhost:2000/todoImage/";
let imagePlaceholder = "todo-image-place-holder.jpg";
 let file = req.file;
 console.log(file);
 let {title, desc, status} = req.body;
 let database = TodoDB;
 let TodoItem = {
    id: new Date().getTime(),
    userId: req.session.user.id,
    title,desc,status,
    image : domainName + (!file ?  imagePlaceholder: file?.originalname.split(" ").join("-"))
 }

 database[req.session.user.id].push(TodoItem);// access user todos and push new item
 fs.writeFile("TodoDB.json",JSON.stringify(database),(err)=>{
  if(err) next(err);
   else res.send({
    title: title,message: "Your Todo item added to the list"
   })
 })
})

//Read todo - get
todo.get("/",isAuth,(req,res)=>{
    // sending all todo items
 let todos = TodoDB;
 let userTodoList = todos[req.session.user.id]// selecting the specific user todo list based on user id
 res.send(userTodoList);
});
// Update - put / patch
//put 
todo.put("/update/:id",singleUpload,isAuth,(req,res,next)=>{
// update todo
let domainName = "http://localhost:2000/todoImage/";
let TodoID = req.params.id;
let file = req.file;
let {title, desc, status}= req.body;
let database = TodoDB;
let userTodoList = database[req.session.user.id];
let index = userTodoList.findIndex((elm)=>elm.id==TodoID);
if(index>=0){
  let updateItem = {
    id: userTodoList[index].id,// preserving old todo item id
    title,desc,status,image: domainName + file.originalname
  }
userTodoList[index] = updateItem;
database[req.session.user.id] = userTodoList;
fs.writeFile("TodoDB.json",JSON.stringify(database),(err)=>{
    if(err) next(err);
       else res.send({
        id: userTodoList[index].id,
        message: "Your Todo item Updated"
       })
 })
}else{
    res.send({id:TodoID,message: "Todo Item Not Found"});
  }
});

//patch
todo.patch("/patch/:id",singleUpload,isAuth,(req,res,next)=>{
// update todo one feild
let domainName = "http://localhost:2000/todoImage/";
let TodoID = req.params.id;
let file = req.file;
let {title, desc, status}= req.body;
let database = TodoDB;
let userTodoList = database[req.session.user.id];
let index = userTodoList.findIndex((elm)=>elm.id==TodoID);
if(index>=0){
  let updateItem = {
   ...userTodoList[index]
  }
  if(title) updateItem.title = title;
   else if(desc) updateItem.desc = desc;
   else if(status) updateItem.status = status;
   else if(file) updateItem.image = domainName+file.originalname;
   else updateItem  = updateItem;

userTodoList[index] = updateItem;
database[req.session.user.id] = userTodoList;
fs.writeFile("TodoDB.json",JSON.stringify(database),(err)=>{
    if(err) next(err);
       else res.send({
        id: userTodoList[index].id,
        message: "Todo item Updated with Patch request"
       })
 })
}else{
    res.send({id:TodoID,message: "Todo Item Not Found"});
  }
});

//Delete - delete - via id
todo.delete("/delete/:id",isAuth,(req,res,next)=>{
// delete todo
 let TodoID = req.params.id;
 let database = TodoDB;//{}
 // accesss todo list of user
 let userTodoList = database[req.session.user.id]; //user todo list []
 // then use filter to delete
 let index = userTodoList.findIndex((elm)=>elm.id==TodoID);// finding todo item
 if(index>=0){
    let filter = userTodoList.filter((elm)=> elm.id !=TodoID );// exclude item
    database[req.session.user.id] = filter;// rewriting array where todo is removed
    fs.writeFile("TodoDB.json",JSON.stringify(database),(err)=>{
      if(err) next(err);
      else res.send({
       id: userTodoList[index].id,
       message: "Todo Item Deleted"
      });
    });
 }
 else{
   res.send({id:TodoID,message: "Todo Item Not Found"});
 }
});

module.exports = todo;