const http = require("http");

let json = {
    name :"shiv",
    batch:"G-11"
};
let server = http.createServer((request, response)=>{
 response.writeHead(200,{"Content-Type":"text/plain"});
 response.end(JSON.stringify(json));
});


server.listen(3000,()=>{
    console.log("server running on port 3000")
});