import React from 'react';
import { shallow } from 'enzyme';
import { first } from 'lodash';

import ChartTooltip from './index';
import IconTag from '../../../icons/IconTag';
import { placementRateStats } from '../../../../__test__/fixtures/dashboard/PlacementRate';

describe('<ChartTooltip />', () => {
  const { placement_rate, total_projects } = placementRateStats;
  const { name, count, color } = first(placement_rate);
  const value = total_projects;
  const wrapper = shallow(<ChartTooltip title={name} count={count} value={value} color={color}/>);

  it('should render <ChartTooltip /> component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render <ChartTooltip /> component with a project count', () => {
    expect(wrapper.find('.chart-tooltip__content__count span').first().text()).toEqual(`${count}`);
  });

  it('should render <ChartTooltip /> component with the value', () => {
    expect(wrapper.find('.chart-tooltip__aside__value').text()).toEqual(`${value}`);
  });

  it('should render <ChartTooltip /> component with a title', () => {
    expect(wrapper.find('.chart-tooltip__content__title').text()).toEqual(name);
  });
});
