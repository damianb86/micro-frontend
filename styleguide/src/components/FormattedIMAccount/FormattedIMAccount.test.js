import React from 'react';
import { shallow } from 'enzyme';

import FormattedIMAccount from './index';

import coreLocationTypeData from './../../../../__test__/fixtures/common/CoreLocationTypes';
import accountTypeEntities from './../../../../__test__/fixtures/common/AccountTypes';

const IMUSERNAME = 'IMUSERNAME';

const props = {
  im: {},
  locationType: coreLocationTypeData['2'],
  accountType: accountTypeEntities['1'],
  className: 'abc'
};

describe('<FormattedIMAccount />', () => {
  const wrapper = shallow(<FormattedIMAccount {...props} />);

  describe('renderer', () => {
    it('should render <FormattedIMAccount /> component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should return null when im name is not present', () => {
      expect(wrapper.find('.formatted-im')).toHaveLength(0);
    });

    it('should render username', () => {
      wrapper.setProps({ im: { username: IMUSERNAME, id: '16' } });
      expect(wrapper.find('.formatted-im').text().trim()).toMatch(IMUSERNAME);
    });

    it('should append classname', () => {
      wrapper.setProps({ im: { username: IMUSERNAME, id: '16' } });
      expect(wrapper.find('.formatted-im').hasClass(props.className)).toBe(true);
    });

    it('should render locationtype component twice for accountType and locationType respectively', () => {
      wrapper.setProps({ im: { username: IMUSERNAME, id: '16' } });
      expect(wrapper.find('LocationType')).toHaveLength(2);
      expect(wrapper.find('LocationType').at(0).props().type).toBe(props.accountType);
      expect(wrapper.find('LocationType').at(1).props().type).toBe(props.locationType);
    });
  });
});
