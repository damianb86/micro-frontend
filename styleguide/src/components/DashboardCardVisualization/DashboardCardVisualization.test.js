import React from 'react';
import { shallow } from 'enzyme';

import DashboardCardVisualization from './';
import { CANDIDATE_STATUS } from '../../../../__test__/fixtures/common/DashboardItems';

describe('<DashboardCardVisualization />', () => {
  const wrapper = shallow(<DashboardCardVisualization items={CANDIDATE_STATUS} />);

  describe('renderer', () => {
    it('should render the component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render the correct number', () => {
      expect(wrapper.find('.dashboard-visualization__legend__count__number').text().trim()).toEqual("256");
    });

    it('should render the <ChartLegend /> component', () => {
      expect(wrapper.find('ChartLegend')).toHaveLength(1);
    });

    it('should render the <C3Chart /> component', () => {
      expect(wrapper.find('C3Chart')).toHaveLength(1);
    });
  });
});
