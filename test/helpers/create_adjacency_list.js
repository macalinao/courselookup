import { expect } from 'chai';
import _ from 'lodash';

import createAdjacencyList from '../../lib/helpers/create_adjacency_list'

describe('create adjacency list', () => {

  it('should create an accurate adjacency list', () => {

    let list = createAdjacencyList(['CS 3345']);

    expect(list['CS 2305'].adjacent[0].name).to.equal('CS 3345');
    expect(list['CS 2305'].adjacent[0].also)
      .to.include.members(['CS 2305', 'CE 2305', 'TE 2305']);

    expect(list['CS 2336'].adjacent[0].name).to.equal('CS 3345');
    expect(list['CS 2336'].adjacent[0].also)
      .to.include.members(['CS 2336', 'CE 2336', 'TE 2336']);

  });

});
