const db = require('../db/db');


var calculateController = {};

calculateController.getCalculate = function(req, res, next){
  //if no query strings present
  if (Object.keys(req.query).length === 0){
    res.send(`no values for a,b,c and x!`);
  } else if (req.query.a && req.query.b && req.query.c && req.query.x){
    let params = {
      a: parseFloat(req.query.a),
      b: parseFloat(req.query.b),
      c: parseFloat(req.query.c),
      x: parseFloat(req.query.x)
    };

    calculate(params, (results) => {
      res.json(results);
    })
  } else {
    res.send('not enough params')
  }
}

calculateController.postCalculate = function(req, res, next){
  calculate(req.body, (results) => {
    res.json(results);
  })
}

var calculate = function(params, callback) {
  let y1 = params.a*(params.x*params.x) + params.b*params.x + params.c;
  let results = {
    a: params.a, b: params.b, c: params.c, x: params.x, y1: y1
  };

  callback(results)
}

module.exports = calculateController;
