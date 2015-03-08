var fs = require('fs');
var courses = JSON.parse(fs.readFileSync('data/courses.raw.json').toString());
console.log('Flattening courses...');
courses = courses.reduce(function(a, b) {
  return a.concat(b);
});
console.log('Flattened.');
console.log('Parsing descriptions for info...');
courses = courses.map(function(course) {

  var descs = course.desc.split('.').map(function(el) {
    return el.trim();
  });

  var prereq = (descs.filter(function(el) {
    return el.indexOf('Prerequisite') === 0;
  }) || [])[0];
  if (prereq) {
    var prereqs = prereq.substring(prereq.indexOf(':') + 2).split(' and ').map(function(el) {
      while (el.indexOf('(') === 0) {
        var close = el.indexOf(')');
        if (close === -1) {
          el = el.substring(1);
        } else {
          el = el.substring(1, close);
        }
      }
      return el.split(' or ');
    });
  }

  var coreq = (descs.filter(function(el) {
    return el.indexOf('Corequisite') !== -1;
  }) || [])[0];
  if (coreq) {
    var coreqs = coreq.substring(coreq.indexOf(':') + 2).split(' and ').map(function(el) {
      while (el.indexOf('(') === 0) {
        var close = el.indexOf(')');
        if (close === -1) {
          el = el.substring(1);
        } else {
          el = el.substring(1, close);
        }
      }
      return el.split(' or ');
    });
  }

  var same = (descs.filter(function(el) {
    return el.indexOf('(Same as') !== -1;
  }) || [])[0];
  var sameAs = [];
  if (same) {
    var re = /([A-Z]+ [0-9]{4})/g;
    do {
      var match = re.exec(same);
      if (match) {
        sameAs.push(match[1]);
      }
    } while (match);
  }

  course.prereqs = prereqs;
  course.coreqs = coreqs;
  course.sameAs = sameAs;

  return course;
});
console.log('Parsed.');
console.log('Fixing bad course names...');
courses = courses.map(function(course) {

  function listFixNames(list) {
    if (!list) return [];
    return list.map(function(name) {
      return (/([A-Z]+ [\d]{4})/.exec(name) || [])[1];
    }).filter(function(name) {
      return /([A-Z]+ [\d]{4})/.test(name);
    });
  }

  function fixNames(list) {
    if (!list) return [];
    return list.map(listFixNames).filter(function(arr) {
      return arr.length > 0;
    });
  }

  course.prereqs = fixNames(course.prereqs);
  course.coreqs = fixNames(course.coreqs);
  course.sameAs = listFixNames(course.sameAs);

  return course;
});
console.log('Fixed.');
console.log('Writing...');
fs.writeFileSync('data/courses.json', JSON.stringify(courses));
console.log('Written.');
