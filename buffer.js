let buffer = new Buffer.from("hello");
const fs = require("fs");

// console.log(buffer);// converts stings to buffer

fs.readFile("filename.txt",(err,data)=>{
 console.log(data.toString());
})
// let bufferToString = buffer.toString();// converts buffer data to string











//JSON - javascript object object notation



// let bufferToJson = buffer.toJSON();
// console.log(buffer,bufferToString,bufferToJson);

// buffer.write("something new");

// let bufferToStr = buffer.toString();
// let bufferToJs = buffer.toJSON();
// console.log(buffer,bufferToStr,bufferToJs);