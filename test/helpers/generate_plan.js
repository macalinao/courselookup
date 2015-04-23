import fs from 'fs';

import { expect } from 'chai';

import generatePlan from '../../lib/helpers/generate_plan';

describe('generate plan', () => {

  it('should create a valid plan for a single degree', () => {

    let plan = generatePlan({
      degree: JSON.parse(
          fs.readFileSync(__dirname + '/../fixtures/ecs_compsci.json').toString())
    });

    console.log(JSON.stringify(plan));

  });

});
