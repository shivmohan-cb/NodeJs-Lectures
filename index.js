const express = require("express");
const path = require("path");
const data = require("./data.json"); 
const fs = require("fs");
const app = express();

const dirname  = __dirname;

console.log(dirname);
const options = {root:path.join(dirname)};

app.use(express.static(options.root));// created static server like GoLive in VS Code

app.get("/",(req,res)=>{
//   console.log(req);
// res.send("hello this is home route");
res.sendFile("home.html",{root:path.join(dirname)});
// res.send({name:"shiv",batch:"G1-0"});
});

let arrayDatabase = [
  {name:'Shiv',email:"someone@gmail.com",password:"somethingSecret"},
  {name:"Kartik",email:"email@yahoo.com",password:"1234324"},
  {name:"saloni",email:"eamil@eamil.com",password:"hashedPassword"}
]

app.get("/about",(req,res)=>{
    // let param = req.params.para; // parameter accessing
    // console.log(param);
    let query = req.query;
    let name = req.query.name;
    let filtered = arrayDatabase.filter((elm,i)=> name.toLowerCase() == elm.name.toLowerCase());
    console.log(filtered[0]);
   console.log(query);//query parameters anything in url after '?'
   res.send(filtered[0])
//  res.send(`This is paramter user requested  for about page = ${param}`)
// res.sendFile("about.html",options);
});

app.get("/register",(req,res)=>{
  res.sendFile("register.html",options)//
});

app.use(express.urlencoded({extended:false}))

app.post("/register",(req,res)=>{
  console.log(req.body);
  let database = data; /// accessing data.json file data
  database.push(req.body);
  let stringifyOBj = JSON.stringify(database);
  fs.writeFile("data.json",stringifyOBj,()=>{
    res.send("Post Data is saved in Database")
  })
})

app.get("*",(req,res)=>{ // unexpected route handling
  res.sendFile("NotFound.html",options);
});

const Port  = 5000;
app.listen(Port,(err)=>{
 if(err) console.log(err);
 else console.log(`Servering is running on port : ${Port}`)
});