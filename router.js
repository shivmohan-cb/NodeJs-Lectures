const express = require("express");
const fs = require("fs");// importing fs module
// for creating modular routes
const router =  express.Router();

// router level middleware
// router.use((req,res,next)=>{
//   const log = `${new Date().getTime()} - ${req.method} - ${req.url}`
//   console.log(log);
//   req.log = log;
//   fs.writeFile("logger.txt",log+"\n",{flag:"a"},(err)=>{
//     if(err)console.log(err);
//     else{
//       next();
//     }
//   })
// });

router.get("/get",(req,res)=>{
   res.send(req.log);
});

router.post("/post",(req,res)=>{
  res.send(req.log);
});

module.exports = router;
