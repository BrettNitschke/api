const db = require('../db/db');


const calculateController = {};

calculateController.getCalculate = function(req, res){
  //if no query strings present
  if (Object.keys(req.query).length === 0){
    res.json({error: "no values for a,b,c and x"});
  } else if (req.query.a && req.query.b && req.query.c && req.query.x){
    let params = {
      a: parseFloat(req.query.a),
      b: parseFloat(req.query.b),
      c: parseFloat(req.query.c),
      x: parseFloat(req.query.x)
    };

    calculate(params, (results) => {
      store(results, (msg)=>{
        console.log(msg);
      })
      res.json(results);
    })
  } else {
    res.json({error: "invalid params"});
  }
}

calculateController.postCalculate = function(req, res){
  calculate(req.body, (results) => {
    store(results, (msg)=>{
      console.log(msg);
    })
    res.json(results);
  })
}

var calculate = function(params, callback) {
  let y1 = params.a*(params.x*params.x) + params.b*params.x + params.c;
  let y2 = Math.sin(params.x);
  let z = y1/y2;
  let results = {
    a: params.a, b: params.b, c: params.c, x: params.x, y1: y1, y2: y2, 'y1/y2': z
  };

  callback(results)
}

var store = function(results, callback){
  //get the index to store at
  db.get(-1, (err, value) =>{
    if (err){
      //should not happen
      console.log("db not initialized...");
      callback(err);
    }
    var newValue = parseInt(value.last) + 1;
    console.log(newValue);
    db.put(newValue, results, ()=>{
      db.put(-1, {last: newValue});
      callback(`new results stored at ${newValue}`);
    })
  })
}

module.exports = calculateController;
