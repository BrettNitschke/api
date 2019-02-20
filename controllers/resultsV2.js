const fs = require('fs');

const resultsController = {};
var results = [];

resultsController.getResults = function(req, res){
  //get all results
  if (Object.keys(req.query).length === 0){
    getResults(Number.MAX_SAFE_INTEGER, (results) => {
      res.json(results);
    })
  } else if (req.query.count){
    let count = parseInt(req.query.count);
    getResults(count, (results) => {
      res.json(results);
    })
  } else if (req.query.d1 && req.query.d2){
    let d1 = new Date(req.query.d1);
    let d2 = new Date(req.query.d2);
    getResultsByDate(d1, d2, (results) => {
      res.json(results);
    })
  } else if (req.query.d1){
    let d1 = new Date(req.query.d1);
    let d2 = new Date();
    getResultsByDate(d1, d2, (results) => {
      res.json(results);
    })
  } else if (req.query.d2){
    let d1 = new Date("2000-01-01");
    let d2 = new Date(req.query.d2);
    getResultsByDate(d1, d2, (results) => {
      res.json(results);
    })
  } else {
    res.json({error: "invalid params"});
  }
}

getAllResults = function(){
  return new Promise((resolve, reject) =>{
    fs.readFile('records.json', 'utf8', (err, data) =>{
      if (err)
        reject(err);
      else {
        resolve(JSON.parse(data));
      }
    })
  })
}

getResults = async function(numToFetch, callback){
  let records = await getAllResults();
  let numResults = records.results.length
  console.log(numResults);
  var floor;
  if (numToFetch >= numResults) {
    floor = 0;
  } else {
    floor = numResults - numToFetch;
  }
  results = [];
  for (let i = numResults-1; i >= floor; i--){
    results.push(records.results[i]);
  }
  callback(results);
}

getResultsByDate = async function(d1, d2, callback){
  let records = await getAllResults();
  let numResults = records.results.length
  results = [];
  for (let i = numResults-1; i >= 0; i--){
    let date = new Date(records.results[i].date);
    if (d1 < date && date < d2) {
      results.push(records.results[i]);
    }
  }

  callback(results);
}

module.exports = resultsController;
