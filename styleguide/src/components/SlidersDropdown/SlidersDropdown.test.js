import React from 'react';
import { mount } from 'enzyme';

import SlidersDropdown from './index';
import slidersDropdown, { slidersButtonDropdown } from '../../../../__test__/fixtures/sliders';

// Test on Desktop device
window.testMediaQueryValues = { width: 770 };

describe('SearchListDropdown', () => {
  const props = {
    id: 'sld',
    title: 'Dropdown',
    sliders: slidersDropdown,
    onApply: jest.fn(),
    onCancel: jest.fn()
  };
  const wrapper = mount(<SlidersDropdown {...props} />);

  describe('render', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    describe('render dropdown closed', () => {
      it('should render a DropdownButton', () => {
        expect(wrapper.find('DropdownButton')).toHaveLength(1);
      });

      it('should not render DropdownContentButtons', () => {
        expect(wrapper.find('DropdownButton').find('DropdownContentButtons')).toHaveLength(0);
      });

      it('should not render a Slider', () => {
        expect(wrapper.find('Slider')).toHaveLength(0);
      });
    });

    describe('render dropdown opened', () => {
      beforeAll(() => {
        wrapper.find('DropdownButton').find('button').simulate('click');
      });

      it('should render DropdownContentButtons', () => {
        expect(wrapper.find('DropdownButton').find('DropdownContentButtons')).toHaveLength(1);
      });

      it('should render 5 Slider', () => {
        expect(wrapper.find('Slider')).toHaveLength(5);
      });
    });
  });

  describe('functions', () => {
    it('should call props.onCancel when the cancel button is pressed', () => {
      wrapper.find('DropdownContentButtons').find('.sec-button').simulate('click');
      expect(props.onCancel).toHaveBeenCalledTimes(1);
    });

    it('should call props.onApply with the correct parameters when the apply button is pressed', () => {
      wrapper.find('DropdownButton').find('button').simulate('click');
      wrapper.find('DropdownContentButtons').find('.pri-button').simulate('click');
      expect(props.onApply).toHaveBeenCalledTimes(1);
      expect(props.onApply).toHaveBeenLastCalledWith({
        eligibleComp: [100000, 700000],
        flatFee: [0, 1000000],
        percentOfComp: [0, 100],
        likelihood: [0, 100],
        totalComp: [0, 400000]
      });
    });
  });

  describe('with buttons', () => {
    beforeAll(() => {
      wrapper.setProps({ ...props, sliders: slidersButtonDropdown });
    });

    describe('render', () => {
      describe('render dropdown closed', () => {
        it('should not render a Slider or ButtonSlider', () => {
          expect(wrapper.find('Slider')).toHaveLength(0);
          expect(wrapper.find('SlidersGroup')).toHaveLength(0);
          expect(wrapper.find('ButtonSlider')).toHaveLength(0);
        });
      });

      describe('render dropdown opened', () => {
        beforeAll(() => {
          wrapper.find('DropdownButton').find('button').simulate('click');
        });

        it('should render 1 SlidersGroup', () => {
          expect(wrapper.find('SlidersGroup')).toHaveLength(1);
        });

        it('should render 3 Slider', () => {
          expect(wrapper.find('Slider')).toHaveLength(3);
        });

        it('should render 2 button titles', () => {
          expect(wrapper.find('.custom-slider__titles__title')).toHaveLength(2);
        });
      });
    });
  });
});
