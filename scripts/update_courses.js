var P = require('bluebird');
var cheerio = require('cheerio');
var request = require('superagent-bluebird-promise');

var BASE = 'http://catalog.utdallas.edu/2014/undergraduate/courses/';

var depts = JSON.parse(require('fs').readFileSync('departments.json').toString());

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
      var descs = desc.split('.').map(function(el) {
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
        return el.indexOf('or Corequisite') !== -1;
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

      ret.push({
        name: name,
        title: title,
        hours: hours,
        desc: desc,
        prereqs: prereqs,
        coreqs: coreqs,
        sameAs: sameAs
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
