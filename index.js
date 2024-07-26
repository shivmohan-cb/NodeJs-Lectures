const http = require("http");
const { EmptyRoute, HomeRoute, RegisterRoute } = require("./reqRoute");
const { PostRegisterRoute } = require("./postRoute");

let server = http.createServer(async (request,response)=>{
  let {method,url,headers,} = request;
  console.log(method);

  EmptyRoute(method,url,response);//
  HomeRoute(method,url,response);
  RegisterRoute(method,url,response);
  PostRegisterRoute(method,url,response,request);

});

server.listen(5550,(err)=>{
console.log("Server is running on port : 5550");
});




  
