var expect = require('chai').expect;

var courses = require('../courses');

describe('courses', function() {

  it('should calculate if the course can be taken accurately', function() {
    expect(courses.canTake(['CS 1337', 'CS 2305'], courses.details('CS 3340'))).to.be.true;
    expect(courses.canTake(['CS 1337', 'CS 2300'], courses.details('CS 3340'))).to.be.false;
  });

});
