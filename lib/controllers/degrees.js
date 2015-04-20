import Degree from '../models/degree';

export default {
  index() {
  },

  show(req, res) {
    let id = req.params.id;
    Degree.findAllGroups(id).then((groups) => {
      return res.json(groups);
    });
  }
};
