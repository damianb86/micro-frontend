import React from 'react';
import { shallow } from 'enzyme';

import StackedBarChart from './index';
import stats, { STACKED_BAR_CHART_LEGEND } from '../../../../__test__/fixtures/analytics/stackedBarChart';

describe('<StackedBarChart />', () => {
  let wrapper;
  const props = {
    stats,
    legend: STACKED_BAR_CHART_LEGEND,
    handleFilter: jest.fn(),
    selectedOption: ''
  };

  beforeEach(() => {
    wrapper = shallow(<StackedBarChart {...props} />);
    jest.resetAllMocks();
  });

  it('should render <StackedBarChart /> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should not render .card-view__header__right__item when selectedOption is empty', () => {
    expect(wrapper.find('.card-view__header__right__item')).toHaveLength(0);
  });

  it('should render 1 .card-view__header__right__item when selectedOption is present in props', () => {
    wrapper.setProps({ selectedOption: 'selected options' });
    expect(wrapper.find('.card-view__header__right__item')).toHaveLength(1);
  });


  it('should render a cardview body', () => {
    expect(
      wrapper
        .find('CardViewBody')
    ).toHaveLength(1);
  });

  it('should render a dropdown at the right side', () => {
    wrapper.setProps({ selectedOption: 'selected options' });
    expect(
      wrapper
        .find('CardViewHeader')
        .dive()
        .find('SelectOptions')
    ).toHaveLength(1);
  });

  it('should render a stacked bar chart', () => {
    expect(
      wrapper
        .find('CardViewBody')
        .dive()
        .find('C3Chart')
    ).toHaveLength(1);
  });

  it('should render the legends', () => {
    expect(
      wrapper
        .find('CardViewBody')
        .dive()
        .find('ChartLegend')
    ).toHaveLength(1);
  });

  it('should show 1 ChartLegend component', () => {
    expect(wrapper.find('ChartLegend')).toHaveLength(1);
  });

  it('should call handleFilter when onSelect is invoked for selectOptions', () => {
    wrapper.setProps({ selectedOption: 'selected options' });
    wrapper
      .find('CardViewHeader')
      .dive()
      .find('SelectOptions')
      .simulate('select');

    expect(props.handleFilter).toHaveBeenCalledTimes(1);
  });
});
