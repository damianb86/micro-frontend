import React from 'react';
import { shallow } from 'enzyme';

import DashboardCardCandidatesAdded from './';
import { CANDIDATES_ADDED } from '../../../../__test__/fixtures/common/DashboardItems';

describe('<DashboardCardCandidatesAdded />', () => {
  const props = {
    items: CANDIDATES_ADDED.day,
    daysActive: 123,
    onChangeTimeframe: jest.fn()
  };
  const wrapper = shallow(<DashboardCardCandidatesAdded {...props} />);

  describe('renderer', () => {
    it('should render the component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render the correct days active', () => {
      expect(wrapper.find('.dashboard-candidates-added__legend__active__number').text().trim()).toEqual('123');
    });

    it('should render the correct today label', () => {
      expect(wrapper.find('.dashboard-candidates-added__legend__today__text').text().trim()).toEqual('Added Today');
    });

    it('should render the <SelectOptions /> component', () => {
      expect(wrapper.find('SelectOptions')).toHaveLength(1);
    });

    it('should render the <C3Chart /> component', () => {
      expect(wrapper.find('C3Chart')).toHaveLength(1);
    });

    it('should render the correct today week label', () => {
      wrapper.setProps({ ...props, filterSelected: 'week' });
      expect(wrapper.find('.dashboard-candidates-added__legend__today__text').text().trim()).toEqual('Added this Week');
    });

    it('should render the correct today month label', () => {
      wrapper.setProps({ ...props, filterSelected: 'month' });
      expect(wrapper.find('.dashboard-candidates-added__legend__today__text').text().trim()).toEqual('Added this Month');
    });

    it('should call onChangeRange function', () => {
      const selectOptions = wrapper.find('SelectOptions').dive();
      selectOptions.instance().handleSelect('day');
      expect(props.onChangeTimeframe).toBeCalledTimes(1);
      expect(props.onChangeTimeframe).toHaveBeenCalledWith('day', 'formatFilter');
    });
  });
});
