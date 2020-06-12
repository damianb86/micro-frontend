import React from 'react';
import { shallow } from 'enzyme';

import PreferredBadge from './PreferredBadge';

describe('<PreferredBadge />', () => {
  const wrapper = shallow(<PreferredBadge />);
  const badgeComponent = wrapper.find('Badge');

  it('should have 1 Badge component', () => {
    expect(badgeComponent).toHaveLength(1);
  });

  it('badge component should have `badge-success` as the colorClass', () => {
    expect(badgeComponent.prop('colorClass')).toEqual('badge-success');
  });

  it('should have `Preferred` as the badge label', () => {
    expect(badgeComponent.prop('label')).toEqual('Preferred');
  });
});
