import React from 'react';
import { shallow } from 'enzyme';
import CardView, { CardViewHeader, CardViewBody, EmptyCardBody } from './index';

describe('<CardView>', () => {
  const wrapper = shallow(<CardView />);

  describe('when title not present', () => {
    it('should render the card view', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render the children', () => {
      const children = <span>Children</span>;
      wrapper.setProps({ children });
      expect(wrapper.contains(children)).toEqual(true);
    });

    it('should render the card view with a custom class', () => {
      const className = 'testClass';
      wrapper.setProps({ className });
      expect(wrapper.hasClass(className)).toEqual(true);
    });
  });

  describe('when title is present', () => {
    it('should render the card view', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render the card view with a title', () => {
      const title = 'Test Title';
      wrapper.setProps({ title });
      expect(wrapper.find(CardViewHeader).props().title).toEqual(title);
    });

    it('should have card view header', () => {
      expect(wrapper.find(CardViewHeader)).toHaveLength(1);
    });

    it('should have card view body', () => {
      expect(wrapper.find(CardViewBody)).toHaveLength(1);
    });

    it('should render card view with draggable true', () => {
      const draggable = true;
      wrapper.setProps({ draggable });
      expect(wrapper.find(CardViewHeader).props().draggable).toEqual(true);
    });

    it('should render card view with bodyClassName', () => {
      const bodyClassName = 'testClass';
      wrapper.setProps({ bodyClassName });
      expect(wrapper.find(CardViewBody).hasClass(bodyClassName)).toEqual(true);
    });
  });
});

describe('<CardViewHeader/>', () => {
  const wrapper = shallow(<CardViewHeader />);

  it('should render card view header', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render card view header with a title', () => {
    const title = 'Test Title';
    wrapper.setProps({ title });
    expect(wrapper.find('.card-view__header__title').text()).toEqual(title);
  });

  it('should render card view header with a custom class', () => {
    const className = 'Test Class';
    wrapper.setProps({ className });
    expect(wrapper.hasClass(className)).toEqual(true);
  });

  it('should render card view header with noBorder true', () => {
    const noBorder = true;
    wrapper.setProps({ noBorder });
    expect(wrapper.find('.card-view__header').hasClass('card-view__header--no-border')).toEqual(true);
  });

  it('should render card view header with draggable true', () => {
    const draggable = true;
    wrapper.setProps({ draggable });
    expect(wrapper.find('sortableHandle')).toHaveLength(1);
  });

  it('should render card view header with children', () => {
    const children = <span>Children</span>;
    wrapper.setProps({ children });
    expect(wrapper.contains(children)).toEqual(true);
  });
});

describe('<CardViewBody/>', () => {
  const wrapper = shallow(<CardViewBody />);

  it('should render card view body', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render card view body', () => {
    const children = <span>Children</span>;
    wrapper.setProps({ children });
    expect(wrapper.contains(children)).toEqual(true);
  });
});

describe('<EmptyCardBody/>', () => {
  const wrapper = shallow(<EmptyCardBody />);

  it('should render <EmptyCardBody/>', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render <EmptyCardBody/> with a message', () => {
    const message = 'Test Message';
    wrapper.setProps({ message });
    expect(wrapper.contains(message)).toEqual(true);
  });

  it('should render <EmptyCardBody/> with children', () => {
    const children = <span>Children</span>;
    wrapper.setProps({ children });
    expect(wrapper.contains(children)).toEqual(true);
  });
});
