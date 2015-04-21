export default function(degree, classes, list) {
  let data = {};

  // Get suggested classes -- higher priority
  let suggestions = degree.filter((group) => {
    return group.suggestion;
  }).reduce((arr, group) => {
    return arr.concat(group.classes.map((el) => {
      if (Array.isArray(el)) el = el[0];
      return el;
    }));
  }, []);

  // Loop through requirements to find easiest classes to take


}
