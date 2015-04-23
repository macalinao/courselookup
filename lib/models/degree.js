import createAdjacencyList from '../helpers/create_adjacency_list';
import { degrees, groups } from '../db';

export default {

  all() {
    return degrees.findAsync();
  },

  findAllGroups(slug) {
    return this.findGroups(slug).then((groups) => {
      return [groups, this.findGroups('_core')];
    }).spread((groups, coreGroups) => {
      return coreGroups.concat(groups);
    });
  },

  findGroups(slug) {
    return degrees.findOneAsync({ slug }).then((degree) => {
      return groups.findAsync({ degree: degree._id });
    });
  },

  graph(slug) {
    return this.findAllGroups(slug).then((groups) => {
      let arr = groups.reduce((arr, group) => {
        return arr.concat(group.classes.map((c) => {
          if (Array.isArray(c)) c = c[0];
          return c;
        }));
      }, []);
      return { groups, adjacencies: createAdjacencyList(arr, true) };
    });
  }

};
