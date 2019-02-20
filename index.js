const restify = require('restify');
const calculateController = require('./controllers/calculate');
const resultsController = require('./controllers/results');
const mongoose = require('mongoose');

const connectionString = "connectionString=mongodb://Bnitschke:Charlie17@wine-shard-00-00-bmlw1.mongodb.net:27017,wine-shard-00-01-bmlw1.mongodb.net:27017,wine-shard-00-02-bmlw1.mongodb.net:27017/test?ssl=true&replicaSet=Wine-shard-0&authSource=admin"
mongoose.connect(connectionString, { useNewUrlParser: true }).then(() => console.log('mongoose connection succesful'))
  .catch((err) => console.error(err));



var server = restify.createServer();
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/ping', (req, res) => {res.send('pong')});

server.get('/calculate', calculateController.getCalculate);
server.post('/calculate', calculateController.postCalculate);

server.get('/results', resultsController.getResults);

const port = 8080;
server.listen(port, () => {
  console.log('Listening on port %s', port);
});
