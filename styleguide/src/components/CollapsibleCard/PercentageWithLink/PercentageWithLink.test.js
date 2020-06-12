import React from 'react';
import { mount } from 'enzyme';

import PercentageWithLink from './index';

describe('<PercentageWithLink />', () => {
  const props = {
    id: 1,
    partialCount: 15,
    totalCount: 100,
    percentageText: 'Percentage',
    linkText: 'Edit',
    onClick: jest.fn()
  };

  const wrapper = mount(<PercentageWithLink {...props} />);

  describe('render', () => {
    it('should render the correct percentage with the percentageText', () => {
      expect(wrapper.find('.percentage-with-link > span').text()).toBe('15% Percentage');
    });

    it('should render the correct linkText', () => {
      expect(wrapper.find('.percentage-with-link > a').text()).toBe(props.linkText);
    });
  });

  describe('interaction', () => {
    it('should call the onClick function', () => {
      wrapper.find('.percentage-with-link > a').simulate('click');
      expect(props.onClick).toBeCalledWith(props.id);
    });
  });
});
