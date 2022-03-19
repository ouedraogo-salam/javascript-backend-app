const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const { Route } = require('express');
const app = express();
const expressFileupload = require('express-fileupload')
const Router = express.Router();
const FileModel = require("./models/File");

// let connexion = mongoose.createConnection("mongodb+srv://osalam:11QQWPEE31mxdSAR@cluster0.kqvok.mongodb.net/MetadataFile?retryWrites=true&w=majority")
// let connexion = mongoose.createConnection("mongodb+srv://osalam:11QQWPEE31mxdSAR@cluster0.kqvok.mongodb.net/MetadataFile?retryWrites=true&w=majority")



Router.use(expressFileupload())

Router.get("/",function(req,res){
   return res.render("file-send");
})

Router.post("/file/save",function(req,res){
    let {upfile} = req.files;

    upfile.mv(path.resolve(__dirname,"meta",upfile.name),function(error){
       let fileSaveur = {
        name:upfile.name,
        type:upfile.mimetype,
        size:upfile.size, 
        path:path.join("meta",upfile.name)
       }
       FileModel.create(fileSaveur,function(error,file){
           if(error) throw error;
           return res.redirect('/file-metadata')
       });
    })
    
})


mongoose.disconnect()
module.exports = Router;