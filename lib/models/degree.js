import { degrees, groups } from '../db';

export default {

  all() {
    return degrees.findAsync();
  },

  findAllGroups(slug) {
    return this.findGroups(slug).then((groups) => {
      return [groups, this.findGroups('_core')];
    }).spread((groups, coreGroups) => {
      return groups.concat(coreGroups);
    });
  },

  findGroups(slug) {
    return degrees.findOneAsync({ slug }).then((degree) => {
      return groups.findAsync({ degree: degree._id });
    });
  }

};
