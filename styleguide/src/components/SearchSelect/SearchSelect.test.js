/* global describe, it, expect, jest */
import React from 'react';
import { shallow } from 'enzyme';

import SearchSelect from './index';

const items = [
  { id: 0, value: 'James' },
  { id: 1, value: 'John' },
  { id: 2, value: 'Robert' },
  { id: 3, value: 'Michael' },
  { id: 4, value: 'William' },
  { id: 5, value: 'David' },
  { id: 6, value: 'Richard' },
  { id: 7, value: 'Joseph' },
  { id: 8, value: 'Thomas' },
  { id: 9, value: 'Charles' },
  { id: 10, value: 'Christopher' }
];

describe('<SearchSelect/>', () => {
  const mockFn = jest.fn();
  const onChangeMockFn = jest.fn();
  let wrapper;

  describe('simple search and select', () => {
    beforeEach(() => {
      wrapper = shallow(<SearchSelect autoload options={items} autoComplete={mockFn} onSubmit={mockFn} onChange={onChangeMockFn} />);
    });

    it('should render <SearchSelect/> component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render the list on focus', () => {
      wrapper.find('input').simulate('focus');
      expect(wrapper.state().showList).toEqual(true);
      expect(mockFn).toHaveBeenCalled();
    });

    it('should change the value of input field on user input', () => {
      wrapper.find('input').simulate('change', { target: { value: 'Sample text' } });
      expect(wrapper.state().term).toEqual('Sample text');
    });

    it('should clear the value of input field when user clear the field', () => {
      wrapper.find('input').simulate('change', { target: { value: '' } });
      expect(wrapper.state().term).toEqual('');
    });

    it('should render the filtered list on user input', () => {
      wrapper.find('input').simulate('change', { target: { value: 'jo' } });
      expect(wrapper.state().showList).toEqual(true);
      expect(mockFn).toHaveBeenCalled();
    });

    it('should highlight the selected item on pressing down key', () => {
      wrapper.find('input').simulate('change', { target: { value: 'jo' } });
      wrapper.find('input').simulate('keyDown', { key: 'ArrowDown' });
      wrapper.find('input').simulate('keyDown', { key: 'ArrowDown' });
      wrapper.find('input').simulate('keyDown', { key: 'ArrowUp' });
      wrapper.find('input').simulate('keyDown', { key: 'ArrowDown' });
      expect(
        wrapper
          .find('.search-select__list')
          .children()
          .at(1)
          .hasClass('active')
      ).toEqual(true);
    });

    it('should show the selected item from the list as input value on pressing enter key', () => {
      wrapper.find('input').simulate('change', { target: { value: 'jo' } });
      wrapper.find('input').simulate('keyDown', { key: 'ArrowDown' });
      wrapper.find('input').simulate('keyDown', { key: 'ArrowDown' });
      wrapper.find('input').simulate('keyDown', { key: 'Enter' });
      expect(wrapper.state().cursor).toEqual(-1);
      expect(wrapper.state().term).toEqual(items[1].value);
      expect(wrapper.state().showList).toEqual(false);
    });
  });

  describe('search and select with auto suggest', () => {
    const wrapper = shallow(<SearchSelect autoSuggest options={items} autoComplete={mockFn} onSubmit={mockFn} />);

    it('should not appear list after less than three character entered', () => {
      wrapper.find('input').simulate('change', { target: { value: 'jo' } });
      expect(wrapper.state().showList).toEqual(false);
      expect(wrapper.find('ul')).toHaveLength(0);
    });

    it('should show list if user type more than two character', () => {
      wrapper.find('input').simulate('change', { target: { value: 'joh' } });
      expect(wrapper.state().showList).toEqual(true);
      expect(wrapper.find('ul')).toHaveLength(1);
    });
  });

  describe('search and select with auto suggest and create new option', () => {
    beforeEach(() => {
      wrapper = shallow(<SearchSelect autoSuggest creatable options={items} autoComplete={mockFn} onSubmit={mockFn} onChange={onChangeMockFn} />);
    });

    it('should show first option as "Add New: Option Value"', () => {
      wrapper.find('input').simulate('change', { target: { value: 'joh' } });
      expect(wrapper.state().showList).toEqual(true);
      expect(
        wrapper
          .find('ul')
          .children()
          .at(0)
          .text()
      ).toEqual('Add New: "joh"');
    });

    it('should not show first option as "Add New: Option Value" when key matches with the present options', () => {
      wrapper.find('input').simulate('change', { target: { value: 'John' } });
      expect(wrapper.state().showList).toEqual(true);
      expect(
        wrapper
          .find('ul')
          .children()
          .at(0)
          .text()
      ).not.toEqual('Add New: "John"');
    });
  });
});
