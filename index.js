const restify = require('restify');
const calculateController = require('./controllers/calculate');

var server = restify.createServer();
server.use(restify.plugins.queryParser());

server.get('/ping', (req, res) => {res.send('pong')});

server.get('/calculate', calculateController.getCalculate);

server.listen(8080, () => {
  console.log('Listening at %s', server.url);
});
