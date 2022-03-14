const express = require('express');
let app = express();

/* ---------------------------------------------------------*/
/* ------------ import the port storing in .env ------------*/
/* --- whether the .env is not defined we set it to 4000 ---*/
/* ---------------------------------------------------------*/



let Router = express.Router();

Router.get('/api/:timestand',function(req,res){
    
    let {timestand} = req.params;
   
    let apiTime = new Date(+timestand);
    let finalDto = {'unix':apiTime.valueOf(),"utc":apiTime.toUTCString()};
    res.json(finalDto);
    
})


module.exports = Router;