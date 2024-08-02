const express = require("express");
const data = require("./data.json");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({extended:false}));

//1. Create
app.post("/register", (req, res) => {
    // getting user data from req.body
    let { name, email, password } = req.body;

    // creating userdata object
    let userData = {
        id: new Date().getTime().toString().slice(6),// unique id
        name: name,
        email: email,
        password: password
    }
    // accessing data.json data into database variable
    let database = data;//[]
    // filtering the object in database on the bases of requested email
    let filter = database.filter((elm) => elm.email.toLowerCase() == email.toLowerCase());
    // preventing duplicate entries to the data.json
    if (filter.length > 0) { 
        res.send(`${email} is already present in database , Please another email`);
    }
    else {
        //pushing data into database variable
        database.push(userData);
        // converting userData : json to string
        let stringified = JSON.stringify(database);
    //creating data.json file and storing user data in it.
        fs.writeFile("data.json", stringified, (err) => {
            if (err) console.log(err)
            else {
                res.send(`User data recieved ${name}, ${email}, ${password}`);
            }
        })
    }


});


//3. Put Method for updating whole data at once
app.put("/update/:id",(req,res)=>{
   let {name,email,password} = req.body;
   //user requested id
   let userID = req.params.id;
   let database = data; // assigning all data.json data to database variable
   let indexOfUserID = database.findIndex((elm)=>elm.id==userID);
   
   if(indexOfUserID>=0){
    let user = database[indexOfUserID];
    let previousUserID = user.id;
    // let updateValues = {id:previousUserID,name,email,password}
    database[indexOfUserID] = { 
         id:previousUserID ,// spreading old entries of user
         name: name,// update  value of name 
         email:email,// update value of email
         password:password// update value of password
        }

    //converting database : json to string    
    let stringified = JSON.stringify(database);    
    // writing database to data.json    
    fs.writeFile("data.json",stringified,(err)=>{
       if(err) console.log(err);
       else {
        res.send(database[indexOfUserID])
       }
    })    
   }
   else {// if user id is not present in database
    res.send(`Rquested ID : ${userID} NOT FOUND : 404`);
   }

});

//4. Patch Method for updating single entry in user data
app.patch("/update-one/:id",(req,res)=>{
  let userID = req.params.id;
  // getting name from query parameter
  let name = req.query.name;
  
  let database = data;
  let indexOfUserID = database.findIndex((elm) => elm.id == userID );

  if(indexOfUserID>=0){
    //changing single value : name
    database[indexOfUserID].name = name;
    let stringified = JSON.stringify(database);
    fs.writeFile("data.json",stringified,(err)=>{
      if(err) console.log(err)
        else {
         res.send(database[indexOfUserID]);
        }
    })
  }else {
    res.send(`Rquested ID : ${userID} NOT FOUND : 404`);
  }


});

//5. Delete Method for deleting entry in database
app.delete("/delete/:id",(req,res)=>{
    let userID = req.params.id;
    let database = data;
    let indexOfUser = database.findIndex((elm)=> elm.id==userID);
    if(indexOfUser>=0){
    // storing all data except requested userID object
    let filtered = database.filter((elm)=> elm.id != userID);  
    let stringified  = JSON.stringify(filtered);
    fs.writeFile("data.json",stringified,(err)=>{
     if(err) console.log(err);
     else {
        res.send(`${userID} : removed from Database`)
     }
    })
  }else{
       res.send(`404 : NOT FOUND, ${userID} is not available for delete operation`);
  }
});


const port = 1234;
app.listen(port,(err)=>{
if(err) console.log(err);
else {
    console.log(`Server is running on port : ${port}`);
}
});