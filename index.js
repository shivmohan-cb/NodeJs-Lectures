const express = require("express");

const app = express();


app.use(express.static("public"));

app.set("view engine","ejs");

app.set("views","./views");


let name = "Shiv Mohan";

let users = ["Shiv","Mohan","Kunal","Anuj","Shubham"];

app.get("/",(req,res)=>{
    let title = "Home Page"
res.render("home",{myName : name , pageTitle: title});
});

app.get("/home",(req,res)=>{
    res.redirect("/");
});

app.get("/users",(req,res)=>{
    let title = "Users Page"
    res.render("users",{myUsers : users, pageTitle: title});
});

app.get("/about",(req,res)=>{
    let title = "About Page"
 res.render("about",{pageTitle: title});
})
app.get("/contact",(req,res)=>{
    let title = "Contact Page"
 res.render("contact",{pageTitle: title});
})


let port = 5000;
app.listen(port, (err)=>{
 console.log(err ? err : `Server is running on ${port}`);
})