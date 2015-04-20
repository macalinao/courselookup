import Degree from '../models/degree';

export default {
  index(req, res) {
    Degree.all().then((degrees) => {
      return res.json(degrees);
    });
  },

  show(req, res) {
    let slug = req.params.slug;
    Degree.findAllGroups(slug).then((groups) => {
      return res.json(groups);
    });
  },

  graph(req, res) {
    let slug = req.params.slug;
    Degree.graph(slug).then((adjacencyList) => {
      res.json(adjacencyList);
    });
  }
};
