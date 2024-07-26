const qs = require("querystring");
const fs = require("fs");
const data = require("./data.json");

const PostRegisterRoute =  async (method,url,response,request)=>{
if(method=="POST"){
    if(url=="/register"){
        let body = await getBody(request);// data url format
        console.log(body);
        let bodyJson = qs.decode(body); // decoding url encoded data into JSON
        console.log(bodyJson); 
        let dataArray = data; //
        // console.log(dataArray);
        dataArray.push(bodyJson);//pushing object into dataArray 

        let stringifyBody = JSON.stringify(dataArray);// converting json file data into string
        fs.writeFile("./data.json",stringifyBody,(err)=>{
          if(err) console.log(err); //
          else {
            response.writeHead(200,{"Context-Type":"plain/text"});
            response.end("Data saved successfully to the database");
          }
        })
      }
}
}

function getBody(request) { // converting buffer data into url encoded string
    return new Promise((resolve) => {
      const bodyParts = [];
      let body;
      request.on('data', (chunk) => {
        bodyParts.push(chunk);//pushing buffer into body
      }).on('end', () => {
        body = Buffer.concat(bodyParts).toString();//concat all buffer data and converting into string
        resolve(body);
      });
    });
  }

  module.exports = {
    PostRegisterRoute
  }



  // let decodedBody = qs.decode(body); // decoding url fomated data into JSON
  // console.log(decodedBody);
  // let stringifyBody = JSON.stringify(decodedBody);
  // fs.writeFile("./data.json",stringifyBody,(err)=>{
  //       if(err) console.log(err);
  //       else {
  //         response.writeHead(200,{"Context-Type":"plain/text"});
  //         response.end("Yes , your Post has been saved in json data");        
  //       }
  // })
 
