/* global describe, it, expect, jest, beforeEach */

import React from 'react';
import { mount } from 'enzyme';

import ListView from './index';

describe('<ListView />', () => {
  const headers = [
    { key: 'blank', title: ' ', width: 20, present: true },
    { key: 'selected', title: ' ', width: 25, present: true },
    { key: 'project', title: 'Project Name', widthRatio: 3, sortable: true, resizable: true, minWidth: 160, present: true },
    { key: 'projectStatus', title: 'Status', resizable: true, minWidth: 60, sortable: true, },
    { key: 'status', title: 'Days Open', sortable: true, resizable: true, minWidth: 70, defaultAscendingSort: false }
  ];

  const rows = [
    { id: 1, status: 'active', startedAt: '2015-10-06T07:00:00Z', daysOpen: 700 },
    { id: 2, status: 'pitch', startedAt: '2016-10-06T07:00:00Z', daysOpen: 40 }
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ListView header={headers} rows={rows} />);
  });

  it('should be instance of ListView', () => {
    expect(wrapper.instance()).toBeInstanceOf(ListView);
  });

  describe('no fixed fields present', () => {
    it('should not render fixed headers', () => {
      expect(wrapper.find('div.fixed')).toHaveLength(0);
    });
  });

  describe('fixed fields present', () => {
    it('should render fixed headers', () => {
      wrapper.setProps({ noOfFixedColumns: 2 });
      expect(wrapper.find('.list-view__thead').find('div.fixed')).toHaveLength(1);
    });
  });

  describe('handlesort', () => {
    it('when called with default sort order', () => {
      const handleSort = jest.fn();
      wrapper.setProps({ handleSort });
      wrapper.find('ListHeaderCell').at(4).simulate('click')
      expect(handleSort).toHaveBeenCalledWith('status', false);
    });

    it('when called without default sort order', () => {
      const handleSort = jest.fn();
      wrapper.setProps({ handleSort });
      wrapper.find('ListHeaderCell').at(3).simulate('click')
      expect(handleSort).toHaveBeenCalledWith('projectStatus', true);
    });

    it('when called with sort field and sortDirection', () => {
      const handleSort = jest.fn();
      wrapper.setProps({ handleSort, sortAscending: true, sortField: 'projectStatus' });

      wrapper.find('ListHeaderCell').at(3).simulate('click')
      expect(handleSort).toHaveBeenCalledWith('projectStatus', false);
    });
  });

  it('should render ListHeaderCell', () => {
    expect(wrapper.find('ListHeaderCell')).toHaveLength(headers.length);
  });

  describe('no sortable props passed', () => {
    it('should render ListViewRow', () => {
      expect(wrapper.find('.list-view__tbody').find('ListViewRow')).toHaveLength(rows.length);
    });
  });

  describe('empty rows are passed as props', () => {
    it('should render empty message', () => {
      wrapper.setProps({ rows: [], emptyMessage: 'No records found' });
      expect(wrapper.find('div.empty-message').text()).toEqual('No records found');
    });
  });

  describe('loadMore are passed as props', () => {
    const mockFun = jest.fn();

    beforeEach(() => {
      wrapper.setProps({ loadMore: true, handleLoadMore: mockFun });
    });

    describe('loading is passed as props', () => {
      beforeEach(() => {
        wrapper.setProps({ loading: true });
      });

      it('should not render Load More Section', () => {
        expect(wrapper.find('.list-view__tbody').find('.load-more-text-wrapper')).toHaveLength(0);
      });

      it('should render Loading', () => {
        expect(wrapper.find('.list-view__tbody').find('Loading')).toHaveLength(1);
      });
    });
  });

  describe('headerSortable is passed as props', () => {
    const draggableHeaders = [
      { key: 'blank', title: ' ', width: 20, present: true },
      { key: 'selected', title: ' ', width: 25, present: true },
      {
        key: 'project',
        title: 'Project Name',
        widthRatio: 3,
        draggable: true,
        sortable: true,
        resizable: true,
        minWidth: 160,
        present: true
      },
      { key: 'projectStatus', title: 'Status', resizable: true, minWidth: 60, draggable: true },
      { key: 'status', title: 'Days Open', sortable: true, resizable: true, minWidth: 70, draggable: true }
    ];

    beforeEach(() => {
      wrapper.setProps({ headerSortable: true, header: draggableHeaders });
    });

    it('should render SortableListViewHeader component', () => {
      expect(wrapper.find('ListViewHeader')).toHaveLength(1);
      expect(wrapper.find('ListViewHeader').find('sortableElement(ListHeaderCell)')).toHaveLength(3);
    });
  });

  describe('highlighted', () => {
    beforeEach(() => {
      wrapper.setProps({ rows, highlightedRow: 2 });
    });

    it('should render the highlighted class in the last row', () => {
      expect(wrapper.find('ListViewRow')).toHaveLength(2);
      expect(wrapper.find('ListViewRow').first().find('.highlighted')).toHaveLength(0);
      expect(wrapper.find('ListViewRow').last().find('.highlighted')).toHaveLength(1);
    });
  });
});
