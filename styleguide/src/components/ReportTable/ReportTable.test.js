import React from 'react';
import { shallow } from 'enzyme';

import ReportTable from './index';
import { noteActivity, reportTableColumns } from '../../../../__test__/fixtures/notes/ReportCategories';

describe('<ReportTable/>', () => {
  const noteActivityRows = noteActivity.map(data => ({
    id: data.id,
    name: data.name,
    ...data.categories.reduce((prev, curr) => ({ ...prev, [curr.cssClass]: curr.value }), {})
  }));

  const wrapper = shallow(<ReportTable rows={noteActivityRows} columns={reportTableColumns} />);

  it('should render <ReportTable/> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should have a <ListView/>', () => {
    expect(wrapper.find('ListView')).toHaveLength(1);
  });

  it('should render <ListView/> with 14 cols', () => {
    expect(wrapper.find('ListView').props().header).toHaveLength(14);
    expect(wrapper.find('ListView').dive().find('ListHeaderCell')).toHaveLength(14);
    expect(wrapper.find('ListView').dive().find('ListHeaderCell').at(1).dive().find('.list-view__thead__cell').text().trim()).toEqual('Role');
  });

  it('mehtod getGrandTotal should return the sum of all items in the row', () => {
    const row = { 5: '5.0', 8: '8.0', 3: 3.0, 4: 4, 1: 1, 6: 6, 7: 7, 2: 2 };
    const rowSum = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8;
    expect(wrapper.instance().getGrandTotal(row)).toBe(rowSum);
  });

  it('mehtod getAverageRow should return a array with the average of each column', () => {
    const averageRow = wrapper.instance().getAverageRow(wrapper.instance().props.rows);
    const columnAverage = Math.round(wrapper.instance().props.rows.reduce((sum, row) => row.call + sum, 0) / wrapper.instance().props.rows.length);

    expect(columnAverage).toEqual(averageRow.call);
  });

  describe('function sortRow should return row sorted by the criteria', () => {
    let sortField = 'call';
    let sortAscending = true;

    it('sort by call ascending', () => {
      const noteActivityRowsSorted = wrapper.instance().getRowsSorted(wrapper.instance().props.rows, sortField, sortAscending);
      let isSorted = true;
      let prev = null;
      noteActivityRowsSorted.forEach((item, index) => {
        if (index !== 0) {
          if (prev !== null && item[sortField] < prev) {
            isSorted = false;
          }
          prev = item[sortField];
        }
      });

      expect(isSorted).toBeTruthy();
    });

    it('sort by call descending', () => {
      sortAscending = false;
      const noteActivityRowsSorted = wrapper.instance().getRowsSorted(wrapper.instance().props.rows, sortField, sortAscending);
      let isSorted = true;
      let prev = null;
      noteActivityRowsSorted.forEach((item, index) => {
        if (index !== 0) {
          if (prev !== null && item[sortField] > prev) {
            isSorted = false;
          }
          prev = item[sortField];
        }
      });

      expect(isSorted).toBeTruthy();
    });

    it('sort by non numerical field descending', () => {
      sortField = 'name';
      const noteActivityRowsSorted = wrapper.instance().getRowsSorted(wrapper.instance().props.rows, sortField, sortAscending);
      let isSorted = true;
      let prev = null;
      noteActivityRowsSorted.forEach((item, index) => {
        if (index !== 0) {
          if (prev !== null && item[sortField] > prev) {
            isSorted = false;
          }
          prev = item[sortField];
        }
      });

      expect(isSorted).toBeTruthy();
    });
  });
});
