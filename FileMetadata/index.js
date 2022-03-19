const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const app = express();
const Router = express.Router();
require('dotenv').config()


// Router.get("/",function(req,res){
//    return res.render("file-send");
// })

Router.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

Router.post("/api/fileanalyse",multer().single("upfile"),function(req,res){
    console.log("shake and bake")

   let responseObjet = {
      size:req.file.size,
      name:req.file.originalname,
      type:req.file.mimetype
     }
       console.log(responseObjet);
      return res.json(responseObjet);
    
})
module.exports = Router;