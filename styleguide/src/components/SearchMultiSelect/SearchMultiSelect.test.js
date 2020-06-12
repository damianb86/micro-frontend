import React from 'react';
import { mount } from 'enzyme';
import { SearchMultiSelect } from './index';
import { items } from '../../../../__test__/fixtures/SearchMultiSelect';

describe('<SearchMultiSelect />', () => {
  let wrapper;
  const removeMock = jest.fn();
  const onSelectionMock = jest.fn();
  const itemsProp = items.slice(0, 3);
  const dropDownMock = jest.fn(() => true);
  const handleInputChange = jest.fn();
  const onClickMock = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <SearchMultiSelect
        showDropdown={dropDownMock}
        dropdownVisible={true}
        onSelection={onSelectionMock}
        items={itemsProp}
        onRemove={removeMock}
        options={items}
        handleInputChange={handleInputChange}
        onClick={onClickMock}
      />
    );
    jest.resetAllMocks();
  });

  it('should render search multiselect', () => {
    expect(wrapper.find('.search-select-multi')).toHaveLength(1);
  });

  it('should render search MultiTags', () => {
    expect(wrapper.find('MultiTags')).toHaveLength(1);
  });

  it('should render search input box', () => {
    expect(wrapper.find('input[type="text"]')).toHaveLength(1);
  });

  describe('mode focus', () => {
    it('should focus on click ', () => {
      wrapper
        .find('input[type="text"]')
        .first()
        .simulate('focus');
      expect(wrapper.props('showDropdown')).toBeTruthy();
    });

    it('it should render options list on foucus', () => {
      wrapper.setProps({ dropdownVisible: true });
      expect(wrapper.find('.search-select-multi__list > li')).toHaveLength(Object.keys(items).length);
    });

    it('it should change cursor on arrow down', () => {
      expect(wrapper.state().cursor).toEqual(-1);
      wrapper.instance().cursorDown();
      wrapper.instance().cursorDown();
      wrapper.update();
      expect(
        wrapper
          .find('.search-select-multi__list')
          .children()
          .at(1)
          .hasClass('active')
      ).toEqual(true);
      expect(wrapper.state().cursor).toEqual(1);
    });

    it('it should change cursor on arrow up', () => {
      wrapper.setState({ cursor: 1 });
      wrapper.instance().cursorUp();
      wrapper.update();
      expect(
        wrapper
          .find('.search-select-multi__list')
          .children()
          .at(0)
          .hasClass('active')
      ).toEqual(true);
      expect(wrapper.state().cursor).toEqual(0);
    });
  });

  describe('selection', () => {
    it('should not select on enter if cursor is -1', () => {
      wrapper.setState({ cursor: -1 });
      wrapper.update();
      wrapper.instance().handlePressReturn({ preventDefault: jest.fn() });
      expect(onSelectionMock).not.toHaveBeenCalled();
    });

    it('should select on enter based on cursor position', () => {
      wrapper.setState({ cursor: 1 });
      wrapper.instance().handlePressReturn({ preventDefault: jest.fn() });
      expect(onSelectionMock).toHaveBeenCalledWith(itemsProp[1]);
    });

    it('should select item on click', () => {
      wrapper
        .find('.search-select-multi__list__item')
        .first()
        .simulate('click', { target: { dataset: { label: items[0].id, value: items[0].name } } });
      expect(onSelectionMock).toHaveBeenCalledWith({ id: items[0].id, name: items[0].name });
      wrapper.setState({ cursor: -1 });
    });

    it('should remove selected items on backspace', () => {
      wrapper.setProps({ items: [items[0]] });
      wrapper.update();
      wrapper.instance().deleteOnBackspace();
      expect(removeMock).toHaveBeenCalled();
    });
  });

  describe('input', () => {
    it('should allow input search query', () => {
      wrapper
        .find('input[type="text"]')
        .first()
        .simulate('change', { target: { value: 'david' } });
      expect(wrapper.state().term).toEqual('david');
    });

    it('should filter options list based on term if handleInputChnage is undefined', () => {
      wrapper.setProps({ handleInputChange: undefined });
      wrapper.setState({ term: items[0].name });
      expect(wrapper.find('.search-select-multi__list__item')).toHaveLength(1);
      wrapper.setState({ term: '' });
      expect(wrapper.find('.search-select-multi__list__item')).toHaveLength(items.length);
    });
  });

  describe('onRemove prop', () => {
    it('should remove item form selected items', () => {
      wrapper.instance().removeItem({ currentTarget: { dataset: { id: items[0].id } } });
      expect(removeMock).toHaveBeenCalledWith(items[0].id);
    });
  });

  describe('onClick prop', () => {
    it('should call onClick prop when the input is clicked on', () => {
      wrapper.find('.search-select-multi__input-wrapper').simulate('click');
      expect(dropDownMock).toHaveBeenCalledTimes(1);
      expect(dropDownMock).toHaveBeenCalledWith();
    });
  });

  describe('addToSelectedList', () => {
    it('should call onSelection prop', () => {
      wrapper.instance().addToSelectedList(items[0]);
      expect(onSelectionMock).toHaveBeenCalledWith(items[0]);
    });
  });
});
