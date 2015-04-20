// Script to import the data in the database.

import fs from 'fs';
import mongojs from 'mongojs';
import P from 'bluebird';

P.promisifyAll(fs);

console.log('Connecting to database...');
let db = mongojs(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/courselookup');
console.log('    Connected.');

console.log('Clearing degrees collection...');
let degrees = db.collection('degrees');
P.promisifyAll(degrees);
degrees.remove({});
console.log('    Cleared.');

console.log('Clearing groups collection...');
let groups = db.collection('groups');
P.promisifyAll(groups);
groups.remove({});
console.log('    Cleared.');

console.log('Inserting groups into the database...');
// Read files
const GROUPS_DIR = 'data/groups/'

let degreesMap = [];

fs.readdirAsync(GROUPS_DIR).map((filename) => {
  return [filename, fs.readFileAsync(GROUPS_DIR + filename)];

}).map(([ filename, promise ]) => {
  return promise.then((file) => {
    let data = JSON.parse(file.toString());

    let slug = filename.split('.')[0];

    // Insert degrees
    if (!degreesMap[slug]) {

      return degrees.insertAsync({
        slug: slug,
        name: data[0].degree
      }).then((degree) => {
        degree = degree[0];
        degreesMap[degree.slug] = degree;
        return { degree, data };
      });

    } else {

      let degree = degreesMap[slug];
      return { degrees, data };

    }

  });

}).map(({ degree, data }) => {

  console.log('    Inserting "' + data[0].degree + '" groups');
  return groups.insertAsync(data.map((group) => {
    group.degree = degree._id;
    return group;
  }));

}).then((res) => {
  console.log('    Done.');
  db.close();
});
