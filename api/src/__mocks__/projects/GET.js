import faker from 'faker';

import mock from '../mock';

mock.onGet("/spapi/projects").reply(() => {
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
