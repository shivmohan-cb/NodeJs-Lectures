const http = require("http");
const fs = require("fs");

let server = http.createServer((request,response)=>{
 let {method,url,headers,} = request;
 console.log(method);
 if(method=="GET"){
 if(url=="/"){
    response.writeHead(200,{"Context-Type":"plain/text"});
    response.end("Hi, This Empty page");
 }

 else if(url=="/home"){
  fs.readFile("home.html",'utf-8',(err,data)=>{
    if(err) console.log(err);
    else {
        let homepage = data;
        response.writeHead(200,{"Context-Type":"plain/text"});
        response.end(homepage);
    }
  });
 }
 else if(url=="/register"){
    fs.readFile("register.html","utf-8",(err,data)=>{
        if(err) console.log(err);
        else {
            let registerPage = data;
            response.writeHead(200,{"Context-Type": "text/plain"});
            response.end(registerPage);
        }
    })
 }
// 
 else {
    response.writeHead(404,{"Context-Type":"plain/text"});
    response.end("Erro : 404, NOT - FOUND, Page you requested not found.");
 }
 }
 else {
    if(url=="register"){
        response.writeHead(200,{"Context-Type":"plain/text"});
        response.end("Yes , your Post has been saved in json data");
     
    }
 }
});

server.listen(5550,(err)=>{
console.log("Server is running on port : 5550");
});

 //else if(url=="/register"){
//     fs.readFile("register.html",'utf-8',(err,data)=>{
//         if(err) console.log(err);
//         else {
//             let homepage = data;
//             response.writeHead(200,{"Context-Type":"plain/text"});
//             // response.end(homepage);

//             response.end("we recieved your post, and your data is sucessfully saved")
//         }
//       });
//  }