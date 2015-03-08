var courses = require('./courses');

module.exports = function planDegree(taken, pending, load) {
  if (!load) load = 16; // Default to 16 hours maximum per semester

  // Remove duplicates
  pending = pending.filter(function(el) {
    return taken.indexOf(el) === -1;
  });

  // Plan semesters

};
