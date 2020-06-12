/* global describe, it, expect, jest */
import React from 'react';
import { shallow } from 'enzyme';

import StackedListWithAvatar from './index';
import StackListItems from '../../../../__test__/fixtures/common/StackList';

import MoreIcon from '../../../icons/icon-16-more.svg';
import VisibilityIcon from '../../../icons/icon-16-visibility.svg';

describe('StackedListWithAvatar', () => {
  const wrapper = shallow(<StackedListWithAvatar items={StackListItems} RightIconTop={MoreIcon} RightIconBottom={VisibilityIcon} />);

  it('should render stacked list with avatar', () => {
    expect(wrapper.find('.stacked-list-with-avatar')).toHaveLength(1);
  });

  it('should render stacked list items', () => {
    expect(wrapper.find('.stacked-list-with-avatar').children()).toHaveLength(StackListItems.length);
  });

  it('should render avatar component', () => {
    expect(wrapper.find('Avatar')).toHaveLength(StackListItems.length);
  });

  it('should render the StackListContent component', () => {
    expect(wrapper.find('StackedListContent')).toHaveLength(StackListItems.length);
  });

  it('should render two icons at the right side of the list', () => {
    expect(
      wrapper
        .find('.stacked-list-with-avatar__item__action-controls')
        .at(1)
        .children()
    ).toHaveLength(2);
  });
});
