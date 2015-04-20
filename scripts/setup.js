// Script to import the data in the database.

import fs from 'fs';
import mongojs from 'mongojs';
import P from 'bluebird';

P.promisifyAll(fs);

console.log('Connecting to database...');
let db = mongojs(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/coursesuggest');
console.log('    Connected.');

console.log('Clearing groups collection...');
let groups = db.collection('groups');
P.promisifyAll(groups);
groups.remove({});
console.log('    Cleared.');

console.log('Inserting groups into the database...');
// Read files
const GROUPS_DIR = 'data/groups/'
fs.readdirAsync(GROUPS_DIR).map((file) => {
  return fs.readFileAsync(GROUPS_DIR + file);
}).map((file) => {
  return JSON.parse(file.toString());
}).map((data) => {
  console.log('    Inserting "' + data[0].degree + '" groups');
  return groups.insertAsync(data);
}).then((res) => {
  console.log('    Done.');
  db.close();
});
