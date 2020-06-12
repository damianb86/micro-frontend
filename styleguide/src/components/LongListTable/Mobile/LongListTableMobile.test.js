import React from 'react';
import { mount } from 'enzyme';
import { ASC } from '../../../../constants/common';

import LongListTableMobile from './index';
import { LONG_LIST_ROWS } from '../../../../../__test__/fixtures/common/LongListTable';

describe('<LongListTableMobile />', () => {
  const showCandidateSidePanel = jest.fn();
  const candidacyList = { sortField: 'name', sortOrder: ASC, currentPage: 1, pagesCount: 2, total: 4 };
  const wrapper = mount(<LongListTableMobile rows={LONG_LIST_ROWS} showCandidateSidePanel={showCandidateSidePanel} candidacyList={candidacyList} />);

  describe('render', () => {
    it('should render <LongListTableMobile /> component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render a ListView', () => {
      expect(wrapper.find('ListView')).toHaveLength(1);
    });

    it('should render 4 ListViewRow', () => {
      expect(wrapper.find('ListView').find('ListViewRow')).toHaveLength(4);
    });

    it('should render 4 Avatar', () => {
      expect(wrapper.find('ListView').find('Avatar')).toHaveLength(4);
    });
  });

  describe('sort', () => {
    it('should be sorted by rank by default', () => {
      expect(wrapper.find('ListView').find('.long-list-table-mobile__cell__data__name').first().text()).toBe('John Davis');
    });
  });

  describe('header', () => {
    it('should render 2 headers', () => {
      expect(wrapper.find('ListHeaderCell')).toHaveLength(2);
    });

    it('should the candidates count to be 4', () => {
      expect(wrapper.find('.long-list-table-mobile__count__number').text()).toBe('4');
    });
  });

  describe('functions', () => {
    describe('showCandidateSidePanel', () => {
      it('should call showCandidateSidePanel when click on avatar or name', () => {
        wrapper.find('.long-list-table-mobile__cell__data__top').first().simulate('click');
        expect(showCandidateSidePanel).toBeCalledTimes(1);
      });
    });
  });
});
