import React from 'react';
import { shallow } from 'enzyme';
import ExpandableLinks from './ExpandableLinks';

describe('<ExpandableLinks />', () => {
  let wrapper;
  const mockFn = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<ExpandableLinks onMinimize={mockFn} />);
    jest.resetAllMocks();
  });

  it('should render component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render two links', () => {
    expect(wrapper.find('a')).toHaveLength(2);
  });

  it('should call onMinimize when minimize icon click', () => {
    wrapper.find('a').at(1).simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
