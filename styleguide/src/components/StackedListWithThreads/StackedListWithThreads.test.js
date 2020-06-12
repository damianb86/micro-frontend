/* global describe, it, expect, jest */
import React from 'react';
import { shallow } from 'enzyme';

import StackedListWithThreads from './index';
import { itemsWithThreads } from '../../../../__test__/fixtures/common/StackList';

import MoreIcon from '../../../icons/icon-16-more.svg';

const OPTIONS = [
  {
    id: 'reply',
    value: 'Reply',
    icon: <MoreIcon />
  },
  {
    id: 'hide',
    value: 'Hide Visibility',
    icon: <MoreIcon />
  }
];

describe('StackedListWithThreads', () => {
  const wrapper = shallow(<StackedListWithThreads items={itemsWithThreads} menuOptions={OPTIONS} />);

  it('should render StackedListWithThreads', () => {
    expect(wrapper).toHaveLength(1);
  });

  it(`should render ${itemsWithThreads.length} StackedListItem`, () => {
    expect(wrapper.find('StackedListItem')).toHaveLength(itemsWithThreads.length);
  });
});
