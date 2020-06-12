import faker from 'faker';

import mock from '../mock';
import { PROJECTS } from './fixtures';

mock.onGet("/spapi/projects").reply(200,
  {
    "data": PROJECTS,
    "meta": {
      "total": 80,
      "currentPage": 1,
      "pagesCount": 7,
    }
  }
);

mock.onGet("/spapi/projects?faker").reply(() => {
  const projects = [];
  for (let i = 0; i < 5; i++) {
    projects.push({
      id: i+1,
      name: faker.name.jobTitle(),
      status: faker.lorem.word(),
      highestStatus: faker.lorem.word(),
      candidates: faker.random.number(),
      createdAt: faker.date.past(),
      createdAt: faker.date.past(),
      isInternal: faker.random.boolean(),
      isConfidential: faker.random.boolean(),
      industry: faker.name.jobArea(),
      specialty: faker.name.jobType(),
      seniority: faker.name.jobDescriptor(),
      attributes: { selected: true }
    });
  }
  
  return [200, projects];
});
