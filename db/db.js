const level = require('level');
const path = require('path');

var dbPath = path.join(__dirname, 'mydb');

var options = {
  valueEncoding: 'json'
};

var db = level(dbPath, options);


//the value at -1 stores the index of the last stored value
db.get(-1, (err, value)=>{
  if (err) {
    console.log("Initializing DB...");
    db.put(-1, {last: 0})
    return;
  } else {
    console.log(`Last value in db at key ${value.last}`);
  }
})


module.exports = db;
