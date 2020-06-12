import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import FormattedPlural from '.';

describe('<FormattedPlural />', () => {
  const props = {
    number: 1,
    options: {
      one: 'One',
      other: 'Other'
    }
  };

  it('should render the correct number 1 and label', () => {
    const wrapper = mount(<IntlProvider locale="en"><FormattedPlural {...props} /></IntlProvider>);
    expect(wrapper.text()).toBe('1 One');
  });

  it('should render the correct number 99 and label', () => {
    const wrapper = mount(<IntlProvider locale="en"><FormattedPlural {...props} number={99} /></IntlProvider>);
    expect(wrapper.text()).toBe('99 Other');
  });
});
