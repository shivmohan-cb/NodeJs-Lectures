const express = require("express");
const app = express();

app.use(express.static("public"));// serving static folder
// setting ejs view engine in our application
app.set("view engine", "ejs");

// setting directory path of our ejs views files
app.set("views", "./views");

let text = "this is ejs text";
let data = [
    {
        title: "First Title"
    }, {
        title: "Second Title"
    }
]

const links = ["home", "about", "contact"];

app.get("/", (req, res) => {
    res.redirect("/home");
})

app.get("/home", (req, res) => {
    res.render("home", { ejsText: text, something: data, links });
});

app.get("/about", (req, res) => {
    // about page
    let heading = "This is About Page";
    let para = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque blanditiis, deserunt odit commodi quod, saepe aliquid culpa dignissimos ipsa eligendi, totam ex rerum. Obcaecati veritatis nam id temporibus quibusdam neque minima ducimus?";
    res.render("about", { heading, para, links });
});

app.get("/contact", (req, res) => {
    // conact page
    let heading = "This is Contact Page";
    let para = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque blanditiis, deserunt odit commodi quod, saepe aliquid culpa dignissimos ipsa eligendi, totam ex rerum. Obcaecati veritatis nam id temporibus quibusdam neque minima ducimus?";
    res.render("contact", { heading, para, links });
})

const port = 1234;
app.listen(port, (err) => {
    console.log(err ? err : `Server is running on PORT : ${port}`);
});