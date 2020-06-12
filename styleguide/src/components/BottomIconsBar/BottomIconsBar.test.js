import React from 'react';
import { shallow } from 'enzyme';

import BottomIconsBar from './';

describe('<BottomIconsBar />', () => {
  const props = {
    icons: [{
      icon: <div className="some-icon" />,
      badge: <div className="some-badge" />
    }, { icon: <div className="some-icon" /> }, {}]
  };
  const wrapper = shallow(<BottomIconsBar {...props} />);

  it('should have 3 fields', () => {
    expect(wrapper.find('.bottom-icons-bar__icon')).toHaveLength(3);
  });

  it('should have 2 icons', () => {
    expect(wrapper.find('.some-icon')).toHaveLength(2);
  });

  it('should have 1 badge', () => {
    expect(wrapper.find('.some-badge')).toHaveLength(1);
  });
});
