import _ from 'lodash';

import courses from './courses';

export default function planDegree({ taken, pending, load }) {
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
      return course;
    });

    // Find hours and put them in
    var remaining = load;
    var sem = [];
    eligible = _.shuffle(eligible);
    while (eligible.length > 0 && remaining > 0) {
      var next = eligible.pop();
      var add = [next];

      if (next.coreqs) {
        var needed = _.cloneDeep(next.coreqs);
        var coreqs = eligible.filter(function(c) {
          for (var i = 0; i < needed.length; i++) {
            var set = needed[i];
            if (set.indexOf(c.name) !== -1) {
              return true;
            }
          }
          return false;
        });
      }

      var hrs = add.reduce(function(a, b) {
        return a + b.hours;
      }, 0);

      if (remaining - hrs > 0) {
        add.map(function(c) {
          sem.push(c);
          rem.push(c.name);
        });
        remaining -= hrs;
      }
    }

    if (rem.length === 0) {
      // No change
      break;
    }

    // Add to plan
    plan.push({
      hours: load - remaining,
      classes: sem
    });

    // Remove from pending
    rem.map(function(course) {
      pending.splice(pending.indexOf(course), 1);
    });

    taken = taken.concat(rem);
  }

  // Return
  return plan;
};
