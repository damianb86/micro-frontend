import React from 'react';
import { mount } from 'enzyme';

import { ASC } from '../../../constants/common';
import LongListTable from './index';
import { LONG_LIST_ROWS } from '../../../../__test__/fixtures/common/LongListTable';
import { HEADER } from '../../project/LongListView/constants';

const candidacyList = { sortField: 'name', sortOrder: ASC, currentPage: 1, pagesCount: 2, total: 50 };

describe('<LongListTable />', () => {
  const wrapper = mount(<LongListTable header={HEADER} rows={LONG_LIST_ROWS} candidacyList={candidacyList} />);

  describe('render', () => {
    it('should render <LongListTable /> component', () => {
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

    it('should render 4 RatingStars', () => {
      expect(wrapper.find('ListView').find('RatingStars')).toHaveLength(4);
    });
  });

  describe('header', () => {
    it('should render headers', () => {
      expect(wrapper.find('ListHeaderCell')).toHaveLength(13);
    });
  });
});
