import React from 'react';
import { shallow } from 'enzyme';

import LocationType from './index';

describe('<LocationType />', () => {
  const locationType = { id: '1', name: 'work' };
  const wrapper = shallow(<LocationType type={locationType} />);

  it('should render LocationType component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render location type name', () => {
    expect(wrapper.find('span').text().trim()).toEqual(`(${locationType.name})`);
  });
});
