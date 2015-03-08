var fs = require('fs');
var courses = JSON.parse(fs.readFileSync('courses.json').toString());
console.log('Flattening courses...');
fs.writeFileSync('courses.flat.json', JSON.stringify(courses.reduce(function(a, b) {
  return a.concat(b);
})));
console.log('Flattened.');
