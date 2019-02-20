const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var RecordSchema = new Schema({
  date: Date,
  data: {
    a: Number,
    b: Number,
    c: Number,
    x: Number,
    y1: Number,
    y2: Number,
    y1dy2: Number
  }
});


module.exports = mongoose.model('Record', RecordSchema);
