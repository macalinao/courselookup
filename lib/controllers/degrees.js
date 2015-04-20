import Degree from '../models/degree';

export default {
  index(req, res) {
    Degree.all().then((degrees) => {
      return res.json(degrees);
    });
  },

  show(req, res) {
    let id = req.params.id;
    Degree.findAllGroups(id).then((groups) => {
      return res.json(groups);
    });
  }
};
