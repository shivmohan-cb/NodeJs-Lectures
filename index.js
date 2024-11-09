const express = require("express");
const { connectMongodb,client } = require("./db");
const { ObjectId } = require("mongodb");
const app = express();

app.use(express.urlencoded({extended:false}));

// Database Name
const dbName = "TodoApp";
//
const db = client.db(dbName);

// Creating collection
const users = db.collection("users");

app.get("/alluser",async(req,res)=>{
    let allUsers =  await users.find().toArray();
    res.send(allUsers);

});
app.post("/user", async (req,res)=>{
    // get name , email , password from user
     const {name,email,password} = req.body;
    await users.insertOne({
        name,email,password
    });

    res.send("user created successfully");
});

app.patch("/update/:id",async(req,res)=>{
// update user based on id
let  userId = req.params.id;
let name = req.body.name;
let updated = await users.updateOne({_id: new ObjectId(userId)},{
  $set : { name }
});
res.send({updated});
});

app.delete("/delete/:id", async(req,res)=>{
// delete user based on id
let userid = req.params.id;
const user = await users.find({_id: new ObjectId(userid)}).toArray();

res.send({user});
})

const port = 3333;
app.listen(port,(err)=>{
  if(err) console.log(err);
  else connectMongodb().then(()=>{
  console.log(`Server is running on PORT : ${port}`);
});
});