var fs = require('fs');
var courses = JSON.parse(fs.readFileSync('data/courses.json').toString());
console.log('Flattening courses...');
courses = courses.reduce(function(a, b) {
  return a.concat(b);
});
console.log('Flattened.');
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
fs.writeFileSync('data/courses.flat.json', JSON.stringify(courses));
console.log('Written.');
