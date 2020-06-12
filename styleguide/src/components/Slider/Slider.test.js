import React from 'react';
import { mount } from 'enzyme';

import Slider from './index';

describe('Slider', () => {
  describe('simple slider', () => {
    const props = {
      type: 'currency',
      title: 'Title',
      name: 'Name',
      min: 30,
      max: 200,
      step: 10,
      values: [40, 190],
      onChange: jest.fn()
    };
    const wrapper = mount(<Slider {...props} />);

    describe('render', () => {
      it('should render component', () => {
        expect(wrapper).toHaveLength(1);
      });

      it('should render SimpleSlider component', () => {
        expect(wrapper.find('SimpleSlider')).toHaveLength(1);
      });

      it('should render the title', () => {
        expect(wrapper.find('.custom-slider__title')).toHaveLength(1);
        expect(wrapper.find('.custom-slider__title').text()).toBe(props.title);
      });

      it('should render Steps component', () => {
        expect(wrapper.find('Steps')).toHaveLength(1);
      });

      it('should render two Tooltip components', () => {
        expect(wrapper.find('Tooltip')).toHaveLength(2);
      });

      it('should render Track component', () => {
        expect(wrapper.find('Track')).toHaveLength(1);
      });

      it('should render Marks component', () => {
        expect(wrapper.find('Marks')).toHaveLength(1);
      });
    });
  });

  describe('button slider', () => {
    const props = {
      name: 'totalComp',
      options: [
        { key: 'equity', title: 'Equity', type: 'currency', step: 50000, max: 1000000, values: [0, 400000] },
        { key: 'percentage', title: 'Percentage', type: 'percent', selected: true }
      ],
      onChange: jest.fn()
    };
    const wrapper = mount(<Slider {...props} />);

    describe('render', () => {
      it('should render component', () => {
        expect(wrapper).toHaveLength(1);
      });

      it('should render AdvancedSlider component', () => {
        expect(wrapper.find('AdvancedSlider')).toHaveLength(1);
      });

      it('should render 1 SimpleSlider component', () => {
        expect(wrapper.find('SimpleSlider')).toHaveLength(1);
      });

      it('should render 1 button titles', () => {
        expect(wrapper.find('.custom-slider__titles__title')).toHaveLength(1);
      });
    });
  });
});
