import React from 'react';
import { mount } from 'enzyme';
import { MultiCriteriaInputField } from '.';
import { items } from '../../../../__test__/fixtures/SearchMultiSelect';

describe('<MultiCriteriaInputField />', () => {
  let wrapper;
  const removeMock = jest.fn();
  const onSelectionMock = jest.fn();
  const itemsProp = items.slice(0, 3);
  const onClickMock = jest.fn();
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <MultiCriteriaInputField
        onSelection={onSelectionMock}
        items={itemsProp}
        onRemove={removeMock}
        onClick={onClickMock}
        onSubmit={onSubmitMock}
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

  describe('selection', () => {
    it('should select on enter based on cursor position', () => {
      wrapper.setState({ term: items[0].name });
      wrapper.instance().handlePressReturn({ preventDefault: jest.fn() });
      expect(onSelectionMock).toHaveBeenCalledWith({ id: items[0].name, name: items[0].name });
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
      expect(onClickMock).toHaveBeenCalledTimes(1);
      expect(onClickMock).toHaveBeenCalledWith();
    });
  });

  describe('onSubmit prop', () => {
    it('should call onSubmit prop when press enter and nothing is typed', () => {
      wrapper.setState({ term: '' });
      wrapper.instance().handlePressReturn({ preventDefault: jest.fn() });
      expect(onSubmitMock).toHaveBeenCalledTimes(1);
      expect(onSubmitMock).toHaveBeenCalledWith([{ id: '1', name: 'James' }, { id: '2', name: 'Jamie Allen' }, { id: '3', name: 'Bob' }]);
    });
  });
});
