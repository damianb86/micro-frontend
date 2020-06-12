import React from 'react';
import { shallow } from 'enzyme';

import TextWithBadge from './index';

describe('<TextWithBadge />', () => {
  const props = { text: 'London', visible: true };
  const wrapper = shallow(<TextWithBadge {...props} />);

  it('should render correct text', () => {
    expect(wrapper.text()).toEqual(expect.stringMatching('London'));
  });

  it('should render ClientVisibleBadge when visible is true', () => {
    expect(wrapper.find('ClientVisibleBadge')).toHaveLength(1);
  });

  it('should render ClientVisibleBadge when visible is false', () => {
    wrapper.setProps({ visible: false });
    expect(wrapper.find('ClientVisibleBadge')).toHaveLength(0);
  });
});
