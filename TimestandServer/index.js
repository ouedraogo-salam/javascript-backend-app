const express = require('express');
let app = express();

/* ---------------------------------------------------------*/
/* ------------ import the port storing in .env ------------*/
/* --- whether the .env is not defined we set it to 4000 ---*/
/* ---------------------------------------------------------*/



let Router = express.Router();

let invalidMiddleware = function(req, res, next) {

  let { date } = req.params;
  if (isNaN(date)) {
    let dateValidation = new Date(date);

    if (dateValidation == "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    } else {
      let apiTime = new Date(date);

      return res.json({ 'unix': apiTime.valueOf(), "utc": apiTime.toUTCString() });
    }
  }

  next();

}

let emptyMiddleware = function(req, res, next) {
  let { date } = req.params;

  if (!date) {
    let apiTime = new Date();
    return res.json({ 'unix': apiTime.valueOf(), "utc": apiTime.toUTCString() });
  }
  next();
}


Router.get('/api/:date?', emptyMiddleware, invalidMiddleware, function(req, res) {
  let regex = /\d{5,}/
  let { date } = req.params;
  if (regex.test(date)) {
    let apiTime = new Date(+date);
    let finalDto = { 'unix': +date, "utc": apiTime.toUTCString() };
    return res.json(finalDto);
  }
});

module.exports = Router;