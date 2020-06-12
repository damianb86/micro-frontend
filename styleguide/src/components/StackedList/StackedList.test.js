/* global describe, it, expect, jest */
import React from 'react';
import { shallow } from 'enzyme';

import StackedList from './index';
import StackListItems from '../../../../__test__/fixtures/common/StackList';

import MoreIcon from '../../../icons/icon-16-more.svg';
import CheckboxIcon from '../../../components/common/CheckBox';

describe('StackedList', () => {
  const wrapper = shallow(<StackedList items={StackListItems} LeftIcon={CheckboxIcon} RightIconTop={MoreIcon} />);

  it('should render stacked list', () => {
    expect(wrapper.find('.stacked-list')).toHaveLength(1);
  });

  it('should render stacked list items', () => {
    expect(wrapper.find('.stacked-list').children()).toHaveLength(StackListItems.length);
  });

  it('should render left icon', () => {
    expect(wrapper.find('CheckBox')).toHaveLength(StackListItems.length);
  });

  it('should render the StackListContent component', () => {
    expect(wrapper.find('StackedListContent')).toHaveLength(StackListItems.length);
  });

  it('should render right icon', () => {
    expect(
      wrapper
        .find('.stacked-list__item__action-controls')
        .at(1)
        .children()
    ).toHaveLength(1);
  });
});
