var P = require('bluebird');
var cheerio = require('cheerio');
var request = require('superagent-bluebird-promise');

var BASE = 'http://catalog.utdallas.edu/2014/undergraduate/courses/';

var depts = JSON.parse(require('fs').readFileSync('data/departments.json').toString());

function findCourses(dept) {
  return request.get(BASE + dept).promise().then(function(res) {
    var $ = cheerio.load(res.text);
    var ret = [];
    $('p.course-catalog-description').each(function() {
      var $t = $(this);
      var name = $($t.find('.course_address a')[0]).text();
      var title = $($t.find('.course_title')[0]).text();
      var hours = parseInt($($t.find('.course_hours')[0]).text().substring(1, 2));
      var desc = $t.clone().children('span').remove().end().text().trim();

      // Parse prerequisites
      ret.push({
        name: name,
        title: title,
        hours: hours,
        desc: desc
      });

    });
    return ret;
  });
}

function findAllCourses() {
  return P.map(depts, function(dept) {
    console.log('Browsing ' + dept);
    return findCourses(dept);
  }, {
    concurrency: 10
  });
}

console.log('Finding all courses...');
findAllCourses().then(function(res) {
  console.log('Courses found. Writing file...');
  require('fs').writeFile('data/courses.raw.json', JSON.stringify(res), function() {
    console.log('Courses written to courses.raw.json');
  });
});
