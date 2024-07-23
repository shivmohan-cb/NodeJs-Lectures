// const { Add,Sub } = require("./math.js");

import {add,sub} from "./math.js";

console.log(add(20,30));
console.log(sub(10,5));

import fs from "fs";

fs.open('./openfile.txt',(err)=>{
  if(err) console.log("Error");
  else console.log("File saved Successfully");
  
});

fs.readFile("./openFile.txt","utf-8",(err,data)=>{
if(err) console.log(err);
else console.log(data);
});

fs.writeFile("./textFile.txt","I am good today",(err)=>{
if(err) console.log(err);
else console.log("file written succesfully");
});

let Json = JSON.stringify( {
  name: "Joel",
  class: "G-10",
  college:"Chitkara"
})

fs.writeFile("./data.json",Json,(err)=>{
  if(err) console.log(err);
  else console.log("file written succesfully");
  });

fs.readFile("./data.json",(err,data)=>{
if(err) console.log(err);
else {
  if(!data) console.log("file is empty");//checing if data is empty string
  else {  //if Json is there then parse and console
  let obj = JSON.parse(data);
  console.log(obj.name); //Joel
  }
}
});

fs.rename('newfile.txt', 'ranamedFile.txt', (err) => {
  if (err) throw err;
  console.log('Renaming complete!');
}); 

// removing the existing file
fs.rm('newFile.txt',(err)=>{// rm stands for remove
if(err)console.log(err);
else {
  console.log("successfully removed")
}
});

// for creating new folder/directory 
fs.mkdir("./newFolder",(err)=>{//mk stands for make and dir for directory
 if(err){
  console.log(err);
 }
 else console.log('new folder Created')
});
// create a new directory and 
// inside the dir create a file data.json

fs.mkdir("./math",(err)=>{
  if(err){
    console.log(err)
  }
  else console.log("math folder created");
})
fs.writeFile("./math/data.json",Json,(err)=>{
 if(err) console.log(err);
 else console.log("Data written on file")
})

