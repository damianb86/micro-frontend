import React from 'react';
import { IntlProvider } from 'react-intl';
import { mount } from 'enzyme';

import DashboardCardList from './';
import { OUT_CANDIDATES } from '../../../../__test__/fixtures/common/DashboardItems';

describe('<DashboardCardList />', () => {
  const props = {
    title: 'Candidate',
    titlePlural: 'Candidates',
    items: OUT_CANDIDATES
  };

  const wrapper = mount(<IntlProvider><DashboardCardList {...props} /></IntlProvider>);

  describe('renderer', () => {
    it('should render the component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render <FormattedPlural /> component', () => {
      expect(wrapper.find('FormattedPlural')).toHaveLength(2);
    });

    it('should render 13 <DashboardCardListItem /> component', () => {
      expect(wrapper.find('DashboardCardListItem')).toHaveLength(14);
    });

    it('should render the <DashboardCardListItem /> component with the correct data', () => {
      expect(wrapper.find('DashboardCardListItem').first().find('.dashboard-list__items__item__name').text()).toBe(OUT_CANDIDATES[0].name);
      expect(wrapper.find('DashboardCardListItem').first().find('.dashboard-list__items__item__percent').text()).toBe(`${OUT_CANDIDATES[0].percent}%`);
    });
  });
});
