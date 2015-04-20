/**
 * Takes in an array of classes and returns an adjacency list.
 */
export default function(courses) {
  let list = {};

  function getCourse(data) {
    let course = list[name];
    if (!course) {
      course = {
        name: data.name,
        info: data,
        adjacent: []
      };
      list[name] = course;
    }
    return course;
  }

  // Loop
  courses.map((courseData) => {

    // Add from prereqs
    courseData.prereqs.map((prereq) => {
      let prereq = getCourse(courseData);
      prereq.adjacent.push({
        type: 'prereq',
        name: courseData.name
      });
    });

    // Add from coreqs
    courseData.coreqs.map((courseData) => {
      let coreq = getCourse(courseName);
      coreq.adjacent.push({
        type: 'coreq',
        name: courseData.name
      });
    });

  });

  // Return the adjacency list
  return list;

};
