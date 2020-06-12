import React from 'react';
import { mount } from 'enzyme';

import ListViewContent from './ListViewContent';

window.testMediaQueryValues = { width: 500 };

describe('<ListViewContent />', () => {
  const props = {
    headers: [
      { key: 'blank', title: ' ', width: 20, present: true },
      { key: 'selected', title: ' ', width: 25, present: true },
      { key: 'project', title: 'Project Name', widthRatio: 3, minWidth: 160, present: true },
      { key: 'projectStatus', title: 'Status', minWidth: 60 },
      { key: 'status', title: 'Days Open', minWidth: 70, defaultAscendingSort: false }
    ],
    rows: [
      { id: 1, status: 'active', startedAt: '2015-10-06T07:00:00Z', daysOpen: 700 },
      { id: 2, status: 'pitch', startedAt: '2016-10-06T07:00:00Z', daysOpen: 40 }
    ],
    virtualize: false,
    highlightedRow: '2',
    rowProps: { listHeight: 50, rowHeight: 500 },
    cellWidths: {},
    optimizeRendering: false,
    expandedRowIds: [],
    loading: true,
    isMobileResponsive: true
  };

  const wrapper = mount(<ListViewContent {...props} />);

  describe('render', () => {
    it('should render ListViewContent component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render 2 ListViewRow', () => {
      expect(wrapper.find('ListViewRow')).toHaveLength(2);
    });

    it('should render the Loading', () => {
      expect(wrapper.find('ListViewRow')).toHaveLength(2);
    });
  });

  describe('render', () => {
    beforeAll(() => {
      wrapper.setProps({ ...props, virtualize: true });
    });

    it('should render VirtualizedRows', () => {
      expect(wrapper.find('VirtualizedRows')).toHaveLength(1);
    });
  });
});
