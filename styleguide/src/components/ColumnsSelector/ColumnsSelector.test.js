import React from 'react';
import { shallow } from 'enzyme';

import { ColumnsSelector } from './index';
import CheckboxesData from '../../../../__test__/fixtures/common/ColumnsSelector';

describe('<ColumnsSelector/>', () => {
  let wrapper;
  const onChange = jest.fn();
  const showDropdown = jest.fn(() => true);
  const hideDropdown = jest.fn(() => true);
  const handleSubmit = jest.fn();
  const blur = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ColumnsSelector
        showDropdown={showDropdown}
        hideDropdown={hideDropdown}
        onChange={onChange}
        data={CheckboxesData}
        handleSubmit={handleSubmit}
      />
    );
  });

  it('should render <ColumnsSelector/> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  describe('open dropdown', () => {
    beforeEach(() => {
      wrapper.setProps({ dropdownVisible: true });
    });
    it('should render a heading', () => {
      expect(wrapper.find('h3').text()).toEqual('Show Columns');
    });

    it('should render checkboxes equal to data length', () => {
      expect(wrapper.find('.columns-selector__popup__list__item')).toHaveLength(CheckboxesData.length);
    });

    it('should call onChange prop when checked', () => {
      wrapper
        .find('CheckBox')
        .first()
        .simulate('change');
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleToggleDropdown', () => {
    it('should call toggleDropdown prop if checkboxses are not visible', () => {
      wrapper.instance().handleToggleDropdown();
      expect(showDropdown).toHaveBeenCalled();
    });

    it('should call hideDropdown if checkboxes are visible', () => {
      wrapper.setProps({ dropdownVisible: true });
      wrapper.instance().handleToggleDropdown();
      expect(hideDropdown).toHaveBeenCalled();
    });

    it('should call blur on event target if it is present', () => {
      const e = { target: { blur } };
      wrapper.instance().handleToggleDropdown(e);
      expect(blur).toHaveBeenCalled();
    });
  });

  describe('handleSubmit', () => {
    it('should call handleSubmit prop if dropdown is going to close', () => {
      wrapper.setProps({ dropdownVisible: true });
      wrapper.instance().handleSubmit({ dropdownVisible: false });
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
