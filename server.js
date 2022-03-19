// server.js
// where your node app starts

// init project

var express = require('express');
var app = express();
const bodyParser = require('body-parser');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
/**
 * we require the timestand microservice,
 */
const TimestandService = require('./TimestandServer/index');
app.use('/timestand-microservice',TimestandService)


const RequestHeader = require('./RequestHeader/index');

app.enable("trust proxy");
let result = app.get("trust proxy");

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
app.use('/exercises-tracker',ExerciseTracker);