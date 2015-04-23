import _ from 'lodash';

import Course from '../models/course';

export default function({ degree = [], classes = [], taken = [], maxCredits = 16 }, list) {
  let data = {};

  // All classes we've already picked or used in some way
  let used = taken.concat(classes);

  // Get suggested classes -- higher priority
  let suggestions = degree.filter((group) => {
    return group.suggestion;

  }).reduce((arr, group) => {
    // Reduce
    return arr.concat(group.classes.map((el) => {
      if (Array.isArray(el)) el = el[0];
      return el;
    }));

  }, []).filter((className) => {
    // Filter classes already taken
    return used.indexOf(className) === -1;
  });

  // Loop through requirements and select best choices from each group
  let requirements = degree.filter((group) => {
    return !group.suggestion;
  });

  // The plan
  let classesToTake = [];

  // Loop through requirements
  for (let req of requirements) {
    let credits = req.credits;

    // Remove credits if they've already been fulfilled

    // Get classes we've already taken or used
    let alreadyTaken = used.filter((c) => {
      return _.flatten(req.classes).indexOf(c) !== -1;
    });

    // Classes we haven't taken that apply
    let notTaken = _.flatten(req.classes).filter((c) => {
      return used.indexOf(c) === -1;
    });

    // Subtract the credits from the requirements
    credits -= alreadyTaken.reduce((sum, c) => {
      sum += Course.get(c).hours;
      return sum;
    }, 0);

    // Find our potential classes, filtering out already used
    let potential = req.classes.filter((c) => {
      // Filter out classes already used
      return (
          // If array, filter out if there's common elements
          (Array.isArray(c) && _.intersection(used, c).length === 0)

          // If not array, filter out if it's been used
          || used.indexOf(c) === -1
        );

    }).map((c) => {
      // Greedy -- pick first in all branches
      if (Array.isArray(c)) {
        return c[0];
      }
      return c;
    });

    // Get our classes

    // Look at all of our classes
    notTaken = notTaken.filter((course) => {
      // Ignore if the credits are already all used
      if (credits <= 0) return;

      // Check if the class is suggested
      if (suggestions.indexOf(course) !== -1) {

        // If so, add.
        classesToTake.push(course);
        used.push(course);
        credits -= Course.get(course).hours;
        return false;
      }

      return true;

    });

    // Break if we've gotten all our classes already
    if (credits <= 0) break;

    // Pick random classes until we fulfill requirements
    notTaken.map((course) => {
      // Ignore if the credits are already all used
      if (credits <= 0) return;

      // Add because yolo
      classesToTake.push(course);
      used.push(course);
      credits -= Course.get(course).hours;
      return;

    });

    if (credits > 0) {
      console.log('problem with ' + req.name + ' - credits are ' + credits);
      console.log('required ' + req.credits);
      console.log(notTaken);
      console.log(alreadyTaken);
    }

  }

  return classesToTake;

}
