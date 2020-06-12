import React from 'react';
import { mount } from 'enzyme';

import SlidersGroup from './index';
import slidersDropdown, { slidersButtonDropdown } from '../../../../__test__/fixtures/sliders';

describe('SlidersGroup', () => {
  const props = {
    id: 'sld',
    title: 'Dropdown',
    sliders: slidersDropdown,
    onChange: jest.fn()
  };
  const wrapper = mount(<SlidersGroup {...props} />);

  describe('render', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render 5 Slider', () => {
      expect(wrapper.find('Slider')).toHaveLength(5);
    });
  });

  describe('with buttons', () => {
    beforeAll(() => {
      wrapper.setProps({ ...props, sliders: slidersButtonDropdown });
    });

    describe('render', () => {
      it('should render 3 Slider', () => {
        expect(wrapper.find('Slider')).toHaveLength(3);
      });

      it('should render 2 button titles', () => {
        expect(wrapper.find('.custom-slider__titles__title')).toHaveLength(2);
      });
    });
  });
});
