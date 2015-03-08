var data = JSON.parse(require('fs').readFileSync('data/courses.json'));

module.exports = {
  data: data,

  // Checks if we can take a course
  canTake: function(taken, course) {
    return course.prereqs.filter(function(or) {

      // Check if a course matches in taken.
      return or.filter(function(c) {
        return taken.indexOf(c) === -1;
      }).length >= or.length;
      // Return false if one does.

    }).length === 0;
  },

  details: function(courseName) {
    return (data.filter(function(course) {
      return course.name === courseName;
    }) || [])[0];
  }
};
