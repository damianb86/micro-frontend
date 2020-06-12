import React from 'react';
import { shallow } from 'enzyme';

import TabsSliderIcons from './index';
import IconGrid from '../../../icons/icon-16-grid.svg';

const ICONS_TABS = [{
  id: 'grid',
  title: 'Grid',
  content: <IconGrid />
},
{
  id: 'notes',
  title: 'Notes',
  content: <IconGrid />
},
{
  id: 'tasks',
  title: 'Tasks',
  content: <IconGrid />
},];

describe('<TabsSliderIcons />', () => {
  let wrapper = '';
  const handleChangeTab = jest.fn();

  const initialProps = {
    tabs: ICONS_TABS,
    onChangeTab: handleChangeTab
  };

  const wrapperSetup = (newProps = {}) => {
    const props = {
      ...initialProps,
      ...newProps
    };

    wrapper = shallow(<TabsSliderIcons {...props} />);
  };

  beforeEach(() => {
    jest.resetAllMocks();
    wrapperSetup();
  });

  describe('renderer', () => {
    it('should render TabsSliderIcons compoent', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render TabsSlider compoent', () => {
      expect(wrapper.find('TabsSlider')).toHaveLength(1);
    });

    it('should render 3 TabLink compoents', () => {
      expect(wrapper.find('TabsSlider').dive().find('TabLink')).toHaveLength(3);
    });
  });
});
