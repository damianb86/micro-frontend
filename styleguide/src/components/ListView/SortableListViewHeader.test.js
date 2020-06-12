/* global describe, it, expect, jest, beforeEach */

import React from 'react';
import { mount } from 'enzyme';

import SortableListViewHeader from './SortableListViewHeader';

describe('<SortableListViewHeader />', () => {
  const wrapper = mount(<SortableListViewHeader />);

  it('should be instance of SortableListViewHeader', () => {
    expect(wrapper.instance()).toBeInstanceOf(SortableListViewHeader);
  });

  it('should be render ListViewHeader component', () => {
    expect(wrapper.find('ListViewHeader')).toHaveLength(1);
  });
});
