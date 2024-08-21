const express = require("express");
const multer = require("multer"); //first install multer then,import multer
const path = require("path");
const app = express();
const UserDB = require("./UserDB.json");
const fs = require("fs");
const cors = require("cors");

app.use(cors());
app.use(express.static("uploads"));


// const singleUpload = multer({dest:"uploads/"}).single("image");
const multipleUpload = multer({ dest: "multipleUploads/" }).array("image");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        let fileName = file.originalname;
        cb(null, fileName);
    }
});

const singleUpload = multer({
    storage: storage
}).single("image");

app.get("/", (req, res) => {
    res.sendFile("post.html", { root: path.join(__dirname) });
});

//single file upload
app.post("/post", singleUpload, (req, res) => {
    let domainName = "http://localhost:1234/";
    let { name, email, password } = req.body;
    let file = req.file;
    let userData = {
        id: new Date().getTime(),
        name,
        email,
        password,
        imageUrl: domainName + file.originalname
    }

    let dataBase = UserDB;
    dataBase.push(userData);
    fs.writeFile("UserDB.json", JSON.stringify(dataBase), (err) => {
        if (err) console.log(err);
        else res.send({ message: "New User Created" });
    });

});

// Getting all users
app.get("/allusers",(req,res)=>{
    let allUsers = UserDB;
    res.send(allUsers);
});

app.get("/multiple", (req, res) => {
    res.sendFile("multiple.html", { root: path.join(__dirname) });
});

//multiple file upload
app.post("/multiple", multipleUpload, (req, res) => {
    let { name, email, password } = req.body;
    let files = req.files
    res.send({ name, email, password, files });
});


const port = 1234;
app.listen(port, (err) => {
    if (err) console.log(err);
    else {
        console.log(`Server Is running on Port : ${port}`)
    }
});