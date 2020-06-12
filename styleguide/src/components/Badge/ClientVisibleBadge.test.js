import React from 'react';
import { shallow } from 'enzyme';

import ClientVisibleBadge from './ClientVisibleBadge';

describe('<ClientVisibleBadge />', () => {
  const wrapper = shallow(<ClientVisibleBadge />);
  const badgeComponent = wrapper.find('Badge');

  it('should have 1 Badge component', () => {
    expect(badgeComponent).toHaveLength(1);
  });

  it('badge component should have `badge-client-visible` as the colorClass', () => {
    expect(badgeComponent.prop('colorClass')).toEqual('badge-client-visible');
  });

  it('badge component should have `badge-round-on-top` as the shapeClass', () => {
    expect(badgeComponent.prop('shapeClass')).toEqual('badge-round-on-top');
  });
});
