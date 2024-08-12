const express = require("express");
const fs = require("fs");
const app = express();
const ExpresStatusMonitor = require("express-status-monitor");
app.use(ExpresStatusMonitor());

app.get("/get",(req,res)=>{    
    let data = "non - blocking";
     // Non- blocking code
    // fs.readFile("20M.txt","utf-8",(err,readData)=>{// promise
    //   data = readData;//
    // //   res.send(data);
      
    // })
    // blocking code
   data = fs.readFileSync("10M.txt","utf-8"); // waiting for data to read  
   res.send(data);
});


app.get("/stream",(req,res)=>{
    const streamTxt = fs.createReadStream("10M.txt","utf-8");
// using stream to send data in chunks so that we can use our system memory efficiently
    streamTxt.on("data",(chunk)=> res.write(chunk));// sending while reading chuck by chunk
    streamTxt.on("end",()=> res.end());
});

const port = 2345;
app.listen(port,(err)=>{
 if(err) console.log(err)
    else console.log(`Server is running on PORT : ${port}`)
});