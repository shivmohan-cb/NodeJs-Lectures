const express = require("express");
const newRouter = require("./router");
const logger = require("./loggerMiddleware");
const app = express();

//Application Level Middleware , it is used in whole app
app.use(express.urlencoded({extended:false}));

//middleware used in these methods knows as application level middleware
//app.get() 
//app.use()

app.use(logger);
app.use("/router",newRouter);

app.get("/get",(req,res)=>{
 const body = req.body;
//  res.send(body);
 res.send(req.log);
})

app.post("/post",(req,res)=>{
    const body = req.body;
    res.send(body);
});

const port = 4040;
app.listen(port,(err)=>{
if(err) console.log(err);
else console.log(`server is running on Port : ${port}`)
});