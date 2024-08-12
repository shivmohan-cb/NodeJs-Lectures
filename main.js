const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

app.get("/getReq", (req,res)=>{
res.send("Get Request");
})
app.post("/postReq",(req,res)=>{
    res.send("Post Request");
})
app.put("/putReq",(req,res)=>{
    res.send("Put Request");
})
app.delete("/deleteReq",(req,res)=>{
    res.send("Delete Request");
})

const port = 1234;
app.listen(port,(err)=>{
    if(err) console.log(err)
        else console.log(`Server is running on port : ${port}`);
});
