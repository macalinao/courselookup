import P from 'bluebird';
import mongojs from 'mongojs';

let db = mongojs(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/courselookup');

let degrees = db.collection('degrees');
P.promisifyAll(degrees);

let groups = db.collection('groups');
P.promisifyAll(groups);

export default { db, degrees, groups };
