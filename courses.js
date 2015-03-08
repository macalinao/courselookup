var data = JSON.parse(require('fs').readFileSync('data/courses.flat.json'));

module.exports = {
  data: data
};
