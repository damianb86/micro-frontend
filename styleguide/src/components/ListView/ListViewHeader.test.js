/* global describe, it, expect, jest, beforeEach */

import React from 'react';
import { shallow } from 'enzyme';

import ListViewHeader from './ListViewHeader';

describe('<ListViewHeader />', () => {
  const wrapper = shallow(<ListViewHeader />);

  it('should render ListViewHeader component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render child content when pass as children', () => {
    const span = <span className="child-content">Child content</span>;
    wrapper.setProps({ children: span });
    expect(wrapper.find('.child-content')).toHaveLength(1);
  });
});
