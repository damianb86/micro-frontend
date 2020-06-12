import React from 'react';
import { shallow } from 'enzyme';
import FormattedPhoneNumber from '.';

describe('<FormattedPhoneNumber />', () => {
  const props = { phoneNumber: { } };
  const wrapper = shallow(<FormattedPhoneNumber {...props} />);

  it('should return null when digits are not present', () => {
    expect(wrapper.find('a')).toHaveLength(0);
  });

  it('should render an anchor tag when phoneNumber is present', () => {
    wrapper.setProps({ phoneNumber: { digits: '7789090878' } });
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('should render locationType when locationType is present in props', () => {
    wrapper.setProps({ phoneNumber: { digits: '7789090878' }, locationType: { id: '1', name: 'Mumbai' } });
    expect(wrapper.find('LocationType')).toHaveLength(1);
  });
});
