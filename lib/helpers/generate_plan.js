import _ from 'lodash';

import Course from '../models/course';

export default function({ degree = [], classes = [], taken = [], maxCredits = 16 }, list) {
  let data = {};

  // Get suggested classes -- higher priority
  let suggestions = degree.filter((group) => {
    return group.suggestion;
  }).reduce((arr, group) => {
    return arr.concat(group.classes.map((el) => {
      if (Array.isArray(el)) el = el[0];
      return el;
    }));
  }, []);

  // Loop through requirements and select best choices from each group
  let requirements = degree.filter((group) => {
    return !group.suggestion;
  });

  // All classes we've already picked or used in some way
  let used = taken.concat(classes);

  // Loop through requirements
  for (let req of requirements) {
    let credits = req.credits;

    // Remove credits if they've already been fulfilled

    // Get classes we've already taken or used
    let alreadyTaken = used.filter((c) => {
      return _.flatten(req.classes).indexOf(c) !== -1;
    });

    // Subtract the credits from the requirements
    credits -= alreadyTaken.reduce((sum, c) => {
      sum -= Course.get(c).credits;
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
    while (credits > 0) {

      if (suggestions.indexOf(req.name) !== -1) {
        continue;
      }

    }
  }

}
