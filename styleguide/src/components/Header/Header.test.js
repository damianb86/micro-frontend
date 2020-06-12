import React from 'react';
import { mount } from 'enzyme';
import { FlagsProvider } from 'flagged';

import { Header } from '.';
import { updatePageTitle } from '../../../actions';

import UserFixtures from '../../../../__test__/fixtures/users/index';

jest.mock('../../../actions');

describe('<Header />', () => {
  window.pageTitle = { title: 'Events' };
  window.features = {};

  const props = {
    firmName: 'Kreeti Technology',
    firmLogoUrl: 'https://fakeimg.pl/40x40/',
    currentUser: UserFixtures[0],
    pageTitle: { title: '' },
    dispatch: jest.fn()
  };

  const wrapper = mount(<FlagsProvider features={window.features}><Header {...props} /></FlagsProvider>);

  describe('renderer', () => {
    it('should have 1 .site-header class', () => {
      expect(wrapper.find('.site-header')).toHaveLength(1);
    });

    it('should render firm logo image when props contains firmLogoUrl', () => {
      expect(wrapper.find('.current-firm-logo')).toHaveLength(1);
    });

    it('should render firm logo name when props does NOT contains firmLogoUrl', () => {
      const newProps = {...props, firmLogoUrl: '' };
      wrapper.setProps({
        children: (
          <Header {...newProps }/>
        )
      });
      expect(wrapper.find('.site-header__title').text()).toEqual(props.firmName);
    });
  });

  describe('function/interaction', () => {
    describe('componentDidMount', () => {
      it('should dispatch updatePageTitle action if window contain pageTitle', () => {
        expect(updatePageTitle).toHaveBeenCalledTimes(1);
      });
    });
  });
});
