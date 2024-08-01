const express = require("express");
const fs = require("fs");
const data = require("./data.json");
const app = express();

app.use(express.urlencoded({ extended: false }));

//1. Create
app.post("/register", (req, res) => {
    let { name, password, email } = req.body; //{name:"shiv",password:"241",email:"123@gmail.com"} 
    // user data object
    let userData = {
        id: new Date().getTime().toString().slice(6),//storing id to identify user
        name: name,//storing name user requested
        email: email,//storing email user requested
        password: password //storing password user requested
    };

    // getting data form data.json
    let database = data;
    // checking if emails exist in database
    let filter = database.filter((elm) => elm.email.toLowerCase() == email.toLowerCase())
    if (filter.length > 0) {//if length is more than 0,preventing duplicate enrties
        res.send(`${email} already peresent in database, Use another eamil`)
    }
    else {// push new data to database

        //pushing new data entries to data.json
        database.push(userData);
        // converting userData : json to string  
        let stringifiedUserData = JSON.stringify(database);

        // saving user data to data.json
        fs.writeFile("data.json", stringifiedUserData, (err) => {
            if (err) console.log(err);
            else {
                res.send(`User data with ${email} address and ID: ${userData.id} saved in Database`);
            }
        })
    }

})

//2. Read
app.get("/user/:id", (req, res) => {
    // getting parameter id  
    let userID = req.params.id;

    // getting all data of data.json
    let database = data;
    //finding index of userID
    let indexOfUser = database.findIndex((elm)=>elm.id== userID);
    console.log(indexOfUser);
    if(indexOfUser>=0){
        // getting the index value of user in database
        let userData = database[indexOfUser];// storing user object
        res.send(userData);
    }
    else {
        res.send(`Requested user ID : ${userID} is not available , 404 : not found`)
    }
    
})

//3. update
app.put("/update", (req, res) => {
    res.send("Put request recieved");
})

//4. Delete
app.delete("/delete", (req, res) => {
    res.send("Delete request recieved");
});


const port = 5000;
app.listen(port, (err) => {
    if (err) console.log(err);
    else {
        console.log(`Server is running on port : ${port}`);
    }
})