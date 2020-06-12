import React from 'react';
import { shallow } from 'enzyme';

import MultipleLineChart from './index';
import noteActivityReport from '../../../../__test__/fixtures/common/NoteActivityReport';

describe('<MultipleLineChart />', () => {
  const wrapper = shallow(<MultipleLineChart data={noteActivityReport} />);

  it('should render <MultipleLineChart /> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render a line bar chart', () => {
    expect(
      wrapper
        .find('C3Chart')
    ).toHaveLength(1);
  });

  it('should render a <ChartLegend/> component', () => {
    expect(
      wrapper
        .find('ChartLegend')
    ).toHaveLength(1);
  });

  it('should render an empty state', () => {
    wrapper.setProps({ data: [] });
    expect(
      wrapper
        .find('C3Chart')
    ).toHaveLength(0);
  });
});
