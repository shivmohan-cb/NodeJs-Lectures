const express = require("express");
const productRouter = express.Router();
const path = require("path");
const productDb = require("./productDB.json");
const fs = require("fs");

const multer = require("multer")

const productImages = multer({dest:"productImages/"});

productRouter.get("/all",(req,res)=>{
   // send list of all products to client 
   let data = productDb;
   res.send(data);
});
productRouter.get("/add",(req,res)=>{
// send add product form
 res.sendFile("addProduct.html",{root:path.join(__dirname)});
})
productRouter.post("/add",productImages.array("image"),(req,res)=>{
  // get product details with images and store all data to the database
   let files = req.files;
   let {productName,category} = req.body;
   let newProduct = {
    productName,
    category,
    images:  files.map(elm => elm.path)//
   }
   let database = productDb;
   database.push(newProduct);
   fs.writeFile("productDB.json",JSON.stringify(database),(err)=>{
     if(err) console.log(err);
     else res.send(newProduct);
   })
});

module.exports = productRouter;