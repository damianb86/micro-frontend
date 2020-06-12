import React from 'react';
import { shallow } from 'enzyme';

import NotificationBadge from './NotificationBadge';

describe('<NotificationBadge />', () => {
  const wrapper = shallow(<NotificationBadge />);
  const badgeComponent = wrapper.find('Badge');

  it('should have 1 Badge component', () => {
    expect(badgeComponent).toHaveLength(1);
  });

  it('badge component should have `badge-unread_notifications` as the colorClass', () => {
    expect(badgeComponent.prop('colorClass')).toEqual('badge-unread_notifications');
  });

  it('badge component should have `badge-round-on-top` as the shapeClass', () => {
    expect(badgeComponent.prop('shapeClass')).toEqual('badge-round-on-top');
  });
});
