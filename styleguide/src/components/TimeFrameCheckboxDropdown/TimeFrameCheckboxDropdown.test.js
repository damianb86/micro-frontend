import React from 'react';
import { mount } from 'enzyme';

import TimeFrameCheckboxDropdown from './';
import { peopleCheckboxItems } from '../../../../__test__/fixtures/common/DropdownItems';

// Test on Desktop device
window.testMediaQueryValues = { width: 770 };

describe('TimeFrameCheckboxDropdown', () => {
  const props = {
    id: 'TimeFrameCheckboxDropdown',
    placeholder: 'Date',
    onApply: jest.fn(),
    onCancel: jest.fn(),
    onDatesChange: jest.fn(),
    onSelect: jest.fn(),
    items: peopleCheckboxItems
  };

  const wrapper = mount(<TimeFrameCheckboxDropdown {...props} />);

  describe('renderer', () => {
    it('should render 1 DropdownButton', () => {
      expect(wrapper.find('DropdownButton')).toHaveLength(1);
    });

    it('should not render DropdownContentButtons', () => {
      expect(wrapper.find('DropdownContentButtons')).toHaveLength(0);
    });

    it('should not render TimeFrameSelector', () => {
      expect(wrapper.find('TimeFrameSelector')).toHaveLength(0);
    });

    it('should not render any CheckBox', () => {
      expect(wrapper.find('CheckBox')).toHaveLength(0);
    });

    describe('dropdown open', () => {
      beforeAll(() => {
        wrapper.find('DropdownButton').find('button').simulate('click');
      });

      it('should render 1 DropdownContentButtons', () => {
        expect(wrapper.find('DropdownContentButtons')).toHaveLength(1);
      });

      it('should render 1 TimeFrameSelector', () => {
        expect(wrapper.find('TimeFrameSelector')).toHaveLength(1);
      });

      it('should render the 13 default presets', () => {
        wrapper.find('SelectOptions').find('DropdownButton').find('button').simulate('click');
        expect(wrapper.find('SelectOptions').find('SimpleOption')).toHaveLength(13);
      });

      it('should not render 6 CheckBox', () => {
        expect(wrapper.find('CheckBox')).toHaveLength(6);
      });

      describe('searchMultiSelectOptions in props', () => {
        describe('when searchMultiSelectOptions is not present in the params', () => {
          it('should not render <SearchMultiSelectDropdown /> component', () => {
            expect(wrapper.find('SearchMultiSelectDropdown')).toHaveLength(0);
          });
        });

        describe('when searchMultiSelectOptions is present in the params', () => {
          beforeEach(() => {
            wrapper.setProps({ searchMultiSelectPlaceholder: 'User', searchMultiSelectOptions: [{ id: '100', name: 'Mark' }, { id: '101', name: 'Junior' }] });
          });

          it('should render <SearchMultiSelectDropdown /> component', () => {
            expect(wrapper.find('SearchMultiSelectDropdown')).toHaveLength(1);
          });

          it('should render correct placeholder', () => {
            expect(wrapper.find('.timeframe-checkbox-dropdown__multi-select__label').text()).toEqual('User');
          });
        });
      });
    });
  });

  describe('interaction', () => {
    it('should call onSelect when click in a checkbox', () => {
      wrapper.find('CheckBox').first().find('input').simulate('change');
      expect(props.onSelect).toBeCalledTimes(1);
      expect(props.onSelect).toBeCalledWith('personCreated');
    });
  });
});
