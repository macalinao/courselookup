var expect = require('chai').expect;
var coursesuggest = require('./');

describe('coursesuggest', function() {
  it('should find the courses', function(done) {
    coursesuggest.findCourses('cs').then(function(res) {
      console.log(res);
      done();
    });
  });
});
