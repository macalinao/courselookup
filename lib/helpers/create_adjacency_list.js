import coursesData from '../../data/courses.json';

function getData(courseName) {
  let courseData = coursesData.filter((data) => {
    return data.name === courseName;
  })[0]
  return courseData;
}

/**
 * Takes in an array of classes and returns an adjacency list.
 */
export default function(courses) {
  let list = {};

  function getCourse(data) {
    let course = list[data.name];
    if (!course) {
      course = {
        name: data.name,
        info: data,
        adjacent: []
      };
      list[data.name] = course;
    }
    return course;
  }

  // Loop
  courses.map((courseName) => {

    let courseData = getData(courseName);

    // Add from prereqs
    (courseData.prereqs || []).map((prereqs) => {
      prereqs.map((prereq) => {

        prereq = getCourse(getData(prereq));
        prereq.adjacent.push({
          type: 'prereq',
          name: courseName,
          also: prereqs
        });

      });

    });

    // Add from coreqs
    (courseData.coreqs || []).map((coreqs) => {
      coreqs.map((coreq) => {

        coreq = getCourse(getData(coreq));
        coreq.adjacent.push({
          type: 'coreq',
          name: courseName,
          also: coreqs
        });

      });
    });

  });

  // Return the adjacency list
  return list;

};
