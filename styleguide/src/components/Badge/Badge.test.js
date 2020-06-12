import React from 'react';
import { shallow } from 'enzyme';

import Badge from './index';

describe('<Badge />', () => {
  const props = {
    label: 'Badge Label',
    colorClass: ''
  };

  const wrapper = shallow(<Badge {...props} />);

  describe('renderer', () => {
    it('should have .badge', () => {
      expect(wrapper.find('.badge')).toHaveLength(1);
    });

    it('should have expected label', () => {
      expect(wrapper.find('.badge').text()).toEqual(props.label);
    });

    it('className should contain `badge-success` class when colorClass is equal to `badge-success`', () => {
      wrapper.setProps({ colorClass: 'badge-success' });
      expect(wrapper.find('.badge').hasClass('badge-success')).toBeTruthy();
    });

    it('className should contain `badge-round-on-top` class when shapeClass is equal to `badge-round-on-top`', () => {
      wrapper.setProps({ shapeClass: 'badge-round-on-top' });
      expect(wrapper.find('.badge').hasClass('badge-round-on-top')).toBeTruthy();
    });
  });
});
