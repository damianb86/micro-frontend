import React from 'react';
import { mount } from 'enzyme';

import HorizontalBarChart from '.';
import { noteCategoriesOutreachSelector } from '../../../selectors/notes';
import { outreachNoteCategories } from '../../../../__test__/fixtures/common/NotesList';

describe('<HorizontalBarChart />', () => {
  let wrapper;
  const props = {
    title: 'Notes',
    onChangeRange: jest.fn(),
    items: noteCategoriesOutreachSelector(outreachNoteCategories)
  };

  beforeEach(() => {
    wrapper = mount(<HorizontalBarChart {...props} />);
  });

  describe('render', () => {
    it('should render the title', () => {
      expect(wrapper.find('.horizontal-bar-chart__header__title').text()).toBe(props.title);
    });

    it('should render a SelectOptions', () => {
      expect(wrapper.find('SelectOptions')).toHaveLength(1);
    });

    it('should render 7 items', () => {
      expect(wrapper.find('HorizontalBar')).toHaveLength(7);
    });

    it('should render correct item calue', () => {
      expect(wrapper.find('HorizontalBar').last().find('.horizontal-bar__value').text()).toBe('Others 10');
    });

    it('should render correct bar percent', () => {
      expect(wrapper.find('HorizontalBar').last().find('.horizontal-bar__bar div').prop('style')).toHaveProperty('width', '4%');
    });

    it('should not render empty state', () => {
      expect(wrapper.find('.horizontal-bar-chart__content__empty')).toHaveLength(0);
    });

    it('should render empty state', () => {
      wrapper.setProps({ items: [] });
      expect(wrapper.find('.horizontal-bar-chart__content__empty')).toHaveLength(1);
    });

    it('should render dropdownFilters', () => {
      wrapper.setProps({
        dropdownFilters: [{
          id: 'custom_field',
          options: [{ id: 'option1', value: 'first option' }, { id: 'option2', value: 'second option' }],
          value: 'option1',
          onSelect: jest.fn()
        }]
      });
      expect(wrapper.find('SelectOptions')).toHaveLength(2);
    });

    it('should render given custom select options and not render the default select option', () => {
      wrapper.setProps({
        dropdownFilters: [{
          id: 'custom_field_one',
          options: [{ id: 'option1', value: 'first option' }, { id: 'option2', value: 'second option' }],
          value: 'option1',
          onSelect: jest.fn()
        },
        {
          id: 'custom_field_two',
          options: [{ id: 'option1', value: 'first option' }, { id: 'option2', value: 'second option' }],
          value: 'option1',
          onSelect: jest.fn()
        }],
        onChangeRange: null
      });
      expect(wrapper.find('SelectOptions')).toHaveLength(2);
    });
  });
});
