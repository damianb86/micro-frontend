/* global describe, it, expect, jest, beforeEach */

import React from 'react';
import { mount } from 'enzyme';

import SortableListView from './SortableListView';

describe('<SortableListView />', () => {
  const headers = [
    { key: 'blank', title: ' ', width: 20, present: true },
    { key: 'selected', title: ' ', width: 25, present: true },
    { key: 'project', title: 'Project Name', widthRatio: 3, sortable: true, resizable: true, minWidth: 160, present: true },
    { key: 'projectStatus', title: 'Status', resizable: true, minWidth: 60 },
    { key: 'status', title: 'Days Open', sortable: true, resizable: true, minWidth: 70 }
  ];

  const rows = [
    { id: 1, status: 'active', startedAt: '2015-10-06T07:00:00Z', daysOpen: 700 },
    { id: 2, status: 'pitch', startedAt: '2016-10-06T07:00:00Z', daysOpen: 40 }
  ];

  const wrapper = mount(
    <SortableListView
      header={headers}
      rows={rows}
      sortable
      renderCell={() => null}
      onSortEnd={() => {}}
      useDragHandle
    />
  );

  it('should be instance of SortableListView', () => {
    expect(wrapper.instance()).toBeInstanceOf(SortableListView);
  });

  it('should be instance of ListView and have props sortable=true', () => {
    expect(
      wrapper
        .find('ListView')
        .props().sortable
    ).toBeTruthy();
  });
});
