import React from 'react';
import { mount } from 'enzyme';
import CardMarketplace from './index';

describe('<CardMarketplace>', () => {
  const props = {
    id: 'ID',
    name: 'Name',
    description: 'Description',
    link: 'Link',
    imageSrc: 'ImageSrc',
    integrationStatus: 'disable',
    keyInfo: null
  };
  const wrapper = mount(<CardMarketplace {...props} />);

  describe('render', () => {
    it('should render the CardMarketplace component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render disable class', () => {
      expect(wrapper.find('.disable')).toHaveLength(1);
    });

    it('should render the correct text', () => {
      expect(wrapper.find('.card-action__button a').text()).toBe('Enable Integration');
    });

    it('should not render the Delete button', () => {
      expect(wrapper.find('.delete')).toHaveLength(0);
    });
  });
});
