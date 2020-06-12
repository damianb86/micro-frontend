import mock from '../mock';
import { getJwtDecoded } from '../../helpers';

mock.onGet('/spapi/features').reply((request) => {
  const token = request.headers.Authorization.split(' ')[1];
  const user = getJwtDecoded(token);

  const features = {
    gridview: {
      new_people_view: true
    },
    project_strategy: {
      project_location: true
    },
    storybook: {
      collapsibleCard: {
        v2: true
      }
    }
  };

  switch(user.id) {
    case 5:
      return [200, features];
    case 6:
      return [200, { ...features, storybook: {} }]
  }

  return [200, features];
});
