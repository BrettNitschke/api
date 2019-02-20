const fs = require('fs');
const mongoose = require('mongoose');
const Record = require('../model/record');

const resultsController = {};
var results = [];

resultsController.getResults = function(req, res){
  //get all results
  if (Object.keys(req.query).length === 0){
    getAll((results) => {
      res.json(results);
    })
  } else if (req.query.count){
    let count = parseInt(req.query.count);
    getNumLatest(count, (results) => {
      res.json(results);
    })
  } else if (req.query.d1 && req.query.d2){
    let d1 = new Date(req.query.d1);
    let d2 = new Date(req.query.d2);
    getByDate(d1, d2, (results) => {
      res.json(results);
    })
  } else if (req.query.d1){
    let d1 = new Date(req.query.d1);
    let d2 = new Date();
    getByDate(d1, d2, (results) => {
      res.json(results);
    })
  } else if (req.query.d2){
    let d1 = new Date("2000-01-01");
    let d2 = new Date(req.query.d2);
    getByDate(d1, d2, (results) => {
      res.json(results);
    })
  } else {
    res.json({error: "invalid params"});
  }
}

getAll = function(callback){
  Record.find().sort('-date').exec((err, records) => {
    if(err)
      callback({error: err});
    callback(records);
  })
}

getNumLatest = function(num, callback){
  Record.find().sort('-date').limit(num).exec((err, records) => {
    if(err)
      callback({error: err});
    callback(records);
  })
}

getByDate = function(d1, d2, callback){
  Record.find({"date": {"$gte": d1, "$lt": d2}}).sort('-date').exec((err, records) => {
    if(err)
      callback({error: err});
    callback(records);
  })
}

module.exports = resultsController;
