import React from 'react';
import { shallow } from 'enzyme';

import Tag from './index';

describe('<Tag/>', () => {
  let children = 'Sample Text';
  const mockFn = jest.fn();
  const wrapper = shallow(<Tag onClose={mockFn}>{children}</Tag>);

  it('should render <Tag/> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render children', () => {
    expect(wrapper.text()).toEqual(children);
  });

  it('should truncate text above 27 characters with 3 dots', () => {
    children = 'This is a really long text which will get truncated';
    wrapper.setProps({ children });
    expect(wrapper.text()).toHaveLength(30);
  });
});
