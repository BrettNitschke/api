const fs = require('fs');

const store = {};


store.init = function(callback){
  fs.exists('records.json', (exists)=>{
    if(exists){
       return callback("records.json exists");
    } else {
      var results = {
        results: []
      };
      json = JSON.stringify(results, null, 4);
      fs.writeFile('records.json', json, 'utf8', ()=>{
        return callback("records.json initialized");
      })
    }
  })
}

module.exports = store;
