var cheerio = require('cheerio');
var express = require('express');
var request = require('superagent-bluebird-promise');

var BASE = 'http://catalog.utdallas.edu/2014/undergraduate/courses/';

function findCourses(dept) {
  return request.get(BASE + dept).promise().then(function(res) {
    var $ = cheerio.load(res.text);
    var ret = [];
    $('p.course-catalog-description').each(function() {
      console.log('asf');
      var $t = $(this);
      var name = $($t.find('.course_address a')[0]).text();
      var title = $($t.find('.course_title')[0]).text();
      var hours = parseInt($($t.find('.course_hours')[0]).text().substring(1, 2));
      var desc = $t.clone().children('span').remove().end().text().trim();
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

module.exports = {
  findCourses: findCourses
};


