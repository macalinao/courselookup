import bodyParser from 'body-parser';
import express from 'express';

import planDegree from './plan_degree';
import routes from './routes';

let app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../public'));

routes(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
