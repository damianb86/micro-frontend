import React from 'react';
import { shallow } from 'enzyme';

import StackedListContent from './index';
import StackedListData from '../../../../__test__/fixtures/common/StackList';

describe('StackedListContent', () => {
  const item = StackedListData[0];
  const wrapper = shallow(<StackedListContent {...item} />);

  it('should render StackedListContent', () => {
    expect(wrapper.find('.stacked-list-content')).toHaveLength(1);
  });

  it('should render title', () => {
    expect(wrapper.find('.stacked-list-content__title__main__item').text()).toEqual(item.title);
  });

  it('should render subtitle', () => {
    expect(wrapper.find('.stacked-list-content__title__sub').text()).toEqual(item.subtitle);
  });

  it('should render tags', () => {
    expect(wrapper.find('Tag')).toHaveLength(item.tags.length);
  });

  it('should render body', () => {
    expect(wrapper.find('.stacked-list-content__body')).toHaveLength(1);
  });

  it('should render label', () => {
    expect(wrapper.find('.stacked-list-content__label').children()).toHaveLength(item.labels.length);
  });
});
