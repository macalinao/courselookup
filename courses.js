var data = JSON.parse(require('fs').readFileSync('data/courses.json'));

module.exports = {
  data: data,

  // Checks if we can take a course
  canTake: function(taken, course) {
    for (var i = 0; i < course.prereqs.length; i++) {
      if (taken.indexOf(course.prereqs[i]) === -1) return false;
    }
    return true;
  },

  details: function(courseName) {
    return (data.filter(function(course) {
      return course.name === courseName;
    }) || [])[0];
  }
};
