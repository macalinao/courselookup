import { Router } from 'express';

import degrees from './controllers/degrees';

export default function(app) {

  let api = Router();

  api.post('/plan', function(req, res) {
    res.json(planDegree(req.body));
  });

  api.get('/degrees/:id', degrees.show);

  api.get('/data/taken.json', function(req, res) {
    res.json(JSON.parse(require('fs').readFileSync(__dirname + '/../data/taken.json')));
  });

  api.get('/data/pending.json', function(req, res) {
    res.json(JSON.parse(require('fs').readFileSync(__dirname + '/../data/pending.json')));
  });

  app.use('/api', api);

};
