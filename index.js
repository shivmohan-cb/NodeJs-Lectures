const express = require("express");
const app = express();
const ejs = require("ejs");
// const path = require("path");

app.set('view engine', 'ejs');//
app.set('views', './views');

let data = [
    {
        title: "First Todo",
        desc : "this is ejs application testing"
    },
    {
        title: "Second Todo",
        desc : "using variables in ejs file"
    }
];

let header =[
    "about","Contact"
]


app.get("/",(req,res)=>{
res.render("home",{ list : data, headerData: header });
});


const port = 1234;
app.listen(port, (err) => {
    console.log(err ? err : `Server is running on port ${port}`);
})