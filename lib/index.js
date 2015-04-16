import bodyParser from 'body-parser';
import express from 'express';

import plan from './plan_degree';

let app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../public'));

app.post('/plan', function(req, res) {
  res.json(plan(req.body.taken, req.body.pending, req.body.load));
});

app.get('/data/taken.json', function(req, res) {
  res.json(JSON.parse(require('fs').readFileSync(__dirname + '/../data/taken.json')));
});

app.get('/data/pending.json', function(req, res) {
  res.json(JSON.parse(require('fs').readFileSync(__dirname + '/../data/pending.json')));
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
