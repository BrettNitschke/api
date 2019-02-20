const fs = require('fs');
const mongoose = require('mongoose');
const Record = require('../model/record');

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
      mongoStore(results, (msg)=>{
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
    mongoStore(results, (msg)=>{
      console.log(msg);
    })
    res.json(results);
  })
}

var calculate = function(params, callback) {
  let y1 = params.a*(params.x*params.x) + params.b*params.x + params.c;
  let y2 = Math.sin(params.x);
  let z = y1/y2;
  let date = Date();
  let results = {
    date: date, data: {a: params.a, b: params.b, c: params.c, x: params.x, y1: y1, y2: y2, y1dy2: z
  }};

  callback(results)
}

var mongoStore = function(result, callback){
  var record = new Record();
  record.date = result.date;
  record.data = result.data;
  record.save((err)=> {
    if (err){
      callback(err);
    }
    callback('record addded');
  })
}

module.exports = calculateController;
