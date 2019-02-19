const db = require('../db/db');

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
  } else {
    res.json({error: "invalid params"});
  }
}

getNumberOfResults = function(){
  return new Promise((resolve, reject) => {
    db.get(-1, (err, result) => {
      if (err)
        reject(err);
      else {
        resolve(parseInt(result.last));
      }
    })
  })
}

getIndividualResult = function(index){
  return new Promise((resolve, reject) => {
    db.get(index, (err, result) =>{
      if (err)
        reject(err);
      else
        resolve(result);
    })
  }).then((result)=>{
     return arrayInsert(result);
  }, (err)=>{
    return;
  })
}

arrayInsert = function(result) {
  results.push(result);
}

getResults = async function (numToFetch, callback){
  try {
    let numResults = await getNumberOfResults();
    var floor;
    if (numToFetch >= numResults) {
      floor = 0;
    } else {
      floor = numResults - numToFetch;
    }
    results = [];
    let promises = [];
    for (let i = numResults; i > floor; i--){
      promises.push(getIndividualResult(i));
    }

    Promise.all(promises).then(()=>{
      callback(results);
    })
  } catch(err){
    console.log("ERROR " + err);
  }
}

module.exports = resultsController;
