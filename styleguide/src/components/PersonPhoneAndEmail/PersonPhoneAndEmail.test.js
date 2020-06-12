import React from 'react';
import { shallow } from 'enzyme';

import PersonPhoneAndEmail from './index';

describe('<PersonPhoneAndEmail />', () => {
  let wrapper = '';
  const initialProps = {};
  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps
    };
    wrapper = shallow(<PersonPhoneAndEmail {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  it('should return null when phoneNumber and emailAddress is not present', () => {
    wrapper.setProps({ phoneNumber: {}, emailAddress: undefined });
    expect(wrapper.find('.person-phone-n-email')).toHaveLength(0);
  });

  it('should only return <FormattedPhoneNumber /> component when phoneNumber is present', () => {
    const props = { phoneNumber: { digits: '0123456789' } };
    wrapper.setProps(props);
    expect(wrapper.find('FormattedPhoneNumber')).toHaveLength(1);
    expect(wrapper.find('FormattedEmailAddress')).toHaveLength(0);
  });

  it('should only return <FormattedEmailAddress /> comopnent when emailAddress is present', () => {
    const props = { emailAddress: { address: 'abc@xyz.com' } };
    wrapper.setProps(props);
    expect(wrapper.find('FormattedEmailAddress')).toHaveLength(1);
    expect(wrapper.find('FormattedPhoneNumber')).toHaveLength(0);
  });

  it('should only return <FormattedEmailAddress /> comopnent when emailAddress is present', () => {
    const props = { phoneNumber: { digits: '0123456789' }, emailAddress: { address: 'abc@xyz.com' } };
    wrapper.setProps(props);
    expect(wrapper.find('FormattedEmailAddress')).toHaveLength(1);
    expect(wrapper.find('FormattedPhoneNumber')).toHaveLength(1);
  });
});
