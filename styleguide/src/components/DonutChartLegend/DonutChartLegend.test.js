import React from 'react';
import { mount } from 'enzyme';

import DonutChartLegend from './index';
import { projectGroupSummaryForNoStats } from '../../../../__test__/fixtures/dashboard/projectStats';

describe('DonutChartLegend', () => {
  const props = {
    legendStats: projectGroupSummaryForNoStats,
    total: 0
  };

  const wrapper = mount(<DonutChartLegend {...props} />);

  describe('should render the component', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should show legends in view for every legendStat', () => {
      expect(wrapper.find('.donut-chart-legend__item')).toHaveLength(projectGroupSummaryForNoStats.length);
    });

    it('should show percentage count for every legendStat', () => {
      expect(wrapper.find('.donut-chart-legend__item__count')).toHaveLength(projectGroupSummaryForNoStats.length);
    });

    it('should show label for every legendStat', () => {
      expect(wrapper.find('.donut-chart-legend__item__label')).toHaveLength(projectGroupSummaryForNoStats.length);
    });

    it('should show color for every legendStat', () => {
      expect(wrapper.find('.donut-chart-legend__item__color')).toHaveLength(projectGroupSummaryForNoStats.length);
    });
  });
});
