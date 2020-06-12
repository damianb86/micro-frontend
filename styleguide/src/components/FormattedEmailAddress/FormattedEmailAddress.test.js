import React from 'react';
import { shallow } from 'enzyme';

import FormattedEmailAddress from '.';

describe('<FormattedEmailAddress />', () => {
  let wrapper = '';
  const initialProps = {};
  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps
    };
    wrapper = shallow(<FormattedEmailAddress {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  it('should return null when emailAddress is not present', () => {
    expect(wrapper.find('a')).toHaveLength(0);
  });

  it('should return address when emailAddress is present', () => {
    const props = { emailAddress: { address: 'abc@xyz.com' } };
    wrapper.setProps(props);
    expect(wrapper.find('a').text()).toBe(props.emailAddress.address);
  });

  it('should return href containing mailto when emailAddress is present', () => {
    const props = { pendulumEmail: 'pendulum@mail.com', emailAddress: { address: 'uncommon.email@xyz.com' } };
    wrapper.setProps(props);
    expect(wrapper.find('a').props().href).toContain(`mailto:${props.emailAddress.address.split('@')[0]}`);
  });

  it('should return href containing pendulumEmail when emailAddress is present', () => {
    const props = { pendulumEmail: 'uncommon.pendulum@xyz.com', emailAddress: { address: 'abc@xyz.com' } };
    wrapper.setProps(props);
    expect(wrapper.find('a').props().href).toContain(props.pendulumEmail.split('@')[0]);
  });
});
