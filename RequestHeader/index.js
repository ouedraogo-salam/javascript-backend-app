const express = require('express');
const app = express();
const { append } = require('express/lib/response');
let path = require('path');
const Router = express.Router();



let responseBody = {};

Router.get('/api/whoami',function(req,res){
    responseBody["ipaddress"] = req.ip;
    responseBody["language"] = req.get("accept-language");
    responseBody["software"] = req.get("user-agent");
    return res.json(responseBody)
})

module.exports = Router