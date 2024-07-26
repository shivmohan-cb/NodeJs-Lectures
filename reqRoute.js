const fs = require("fs");
const EmptyRoute = (method,url,response)=>{
    if(method=="GET"){
    if(url=="/"){
        response.writeHead(200,{"Context-Type":"plain/text"});
        response.end("Hi, This Empty page");
     }
    }
}

const HomeRoute = (method,url,response)=>{
    if(method=="GET"){
    if(url=="/home"){
        fs.readFile("home.html",'utf-8',(err,data)=>{
          if(err) console.log(err);
          else {
              let homepage = data;
              response.writeHead(200,{"Context-Type":"plain/text"});
              response.write(homepage);
              response.end();
          }
    });
    fs.readFile("style.css",'utf-8',(err,data)=>{
        if(err) console.log(err);
        else {
            let cssFile = data;
            response.writeHead(200,{"Context-Type":"plain/text"});
            response.write(cssFile);
            response.end();
        }
  });
   }
}
}

const RegisterRoute =(method,url,response) =>{
    if(method=="GET"){
    if(url=="/register"){
        fs.readFile("register.html","utf-8",(err,data)=>{
            if(err) console.log(err);
            else {
                let registerPage = data;
                response.writeHead(200,{"Context-Type": "text/plain"});
                response.end(registerPage);
            }
        })
     }
    }
}


module.exports = {
    EmptyRoute,
    HomeRoute,
    RegisterRoute

}