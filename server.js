// server.js
// where your node app starts

// init project

var express = require('express');
var app = express();

let port = process.env.PORT || 4000;

app.listen(port);
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


const TimestandService = require('./TimestandServer/index');
app.use('/timestand-microservice',TimestandService)
