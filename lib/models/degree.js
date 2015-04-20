import { degrees, groups } from '../db';

export default {

  all() {
    return degrees.findAsync();
  },

  findAllGroups(id) {
    return this.findGroups(id).then((groups) => {
      return [groups, this.findGroups('_core')];
    }).spread((groups, coreGroups) => {
      return groups.concat(coreGroups);
    });
  },

  findGroups(id) {
    return degrees.findOneAsync({ id }).then((degree) => {
      return groups.findAsync({ degree: degree._id });
    });
  }

};
