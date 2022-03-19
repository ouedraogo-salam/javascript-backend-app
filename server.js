// server.js
// where your node app starts

// init project
const path = require('path');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
/* ---------------------------------------------------------*/
/* ------------ import the port storing in .env ------------*/
/* --- whether the .env is not defined we set it to 4000 ---*/
/* ---------------------------------------------------------*/
let port = process.env.PORT || 4000;

app.listen(port);
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.set("view engine","ejs");

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


// app.use(express.static(path.resolve(__dirname,"FileMetadata/views")))
/**
 * we require the timestand microservice,
 */
const TimestandService = require('./TimestandServer/index');
app.use('/timestand-microservice',TimestandService)


const RequestHeader = require('./RequestHeader/index');

app.enable("trust proxy");
app.get("trust proxy");

app.use('/request-header-parser',RequestHeader);

/************************************************************
 * 
 * Exercise Tracker Projet
 * 
 * Firstly required the index file from ExerciseTracker
 * 
 * and then use it with app.use
 * 
 ************************************************************/
const ExerciseTracker = require('./ExerciseTracker/index');
app.use('/exercises-tracker',function(req,res,next){
    mongoose.connect("mongodb+srv://osalam:11QQWPEE31mxdSAR@cluster0.kqvok.mongodb.net/ExerciseTracker?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    next()
},ExerciseTracker);



const FileMetadata = require('./FileMetadata/index');
app.use('/file-metadata',function(req,res,next){
    mongoose.connect("mongodb+srv://osalam:11QQWPEE31mxdSAR@cluster0.kqvok.mongodb.net/MetadataFile?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    next()
},FileMetadata);