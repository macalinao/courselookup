import courses from '../../data/courses.json';

// Pseudo-model for courses.

export default {

  /**
   * Gets a course from its name.
   */
  get(name) {
    let matches = courses.filter((course) => {
      return course.name === name;
    });
    if (matches.length === 0) return null;
    return matches[0];
  }

};
