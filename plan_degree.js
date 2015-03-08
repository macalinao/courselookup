var _ = require('lodash');
var courses = require('./courses');

module.exports = function planDegree(taken, pending, load) {
  if (!load) load = 16; // Default to 16 hours maximum per semester

  // Remove duplicates
  pending = pending.filter(function(el) {
    return taken.indexOf(el) === -1;
  });

  // Plan semesters
  var plan = [];

  // Get them
  while (pending.length > 0) {
    var rem = [];

    // Find all eligible courses
    var eligible = pending.map(function(course) {
      return courses.details(course);
    }).filter(function(course) {
      return courses.canTake(taken, course);
    }).map(function(course) {
      rem.push(course.name);
      return course;
    });

    // Find hours and put them in
    var remaining = load;
    var sem = [];
    eligible = _.shuffle(eligible);
    while (eligible.length > 0 && remaining > 0) {
      var next = eligible.pop();
      if (remaining - next.hours > 0) {
        sem.push(next);
      }
    }

    if (rem.length === 0) {
      // No change
      break;
    }

    // Add to plan
    plan.push(sem);

    // Remove from pending
    rem.map(function(course) {
      pending.splice(pending.indexOf(course), 1);
    });

    taken = taken.concat(rem);
  }

  // Return
  return plan;
};
