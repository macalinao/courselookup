var express = require('express');

var plan = require('./plan_degree');

var app = express();

app.use(require('body-parser').json());

app.use(express.static(__dirname + '/public'));

app.post('/plan', function(req, res) {
  res.json(plan(req.body.taken, req.body.pending, req.body.load));
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
