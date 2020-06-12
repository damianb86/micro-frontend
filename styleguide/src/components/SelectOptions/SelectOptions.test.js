import React from 'react';
import { mount } from 'enzyme';
import SelectOptions from './index';

describe('<SelectOptions /> with simple options', () => {
  let wrapper;
  const props = {
    id: 'ID',
    name: 'NAME',
    onSelect: jest.fn(),
    options: [
      { id: 1, value: 'One' },
      { id: 2, value: 'Two' },
      { id: 3, value: 'Three' }
    ],
    prompt: 'PROMPT',
    disabled: false,
    pullRight: false,
    tabIndex: '-1',
    textTruncate: false
  };
  const event = { preventDefault: jest.fn() };

  beforeAll(() => {
    wrapper = mount(<SelectOptions {...props} />);
    wrapper.setState({ open: true });
    wrapper.update();
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render 1 ul', () => {
      expect(wrapper.find('ul')).toHaveLength(1);
    });

    it('should render 3 SimpleOption', () => {
      expect(wrapper.find('SimpleOption')).toHaveLength(3);
    });

    it('should render 1 li and 1 a', () => {
      expect(wrapper.find('SimpleOption').first().find('li')).toHaveLength(1);
      expect(wrapper.find('SimpleOption').first().find('a')).toHaveLength(1);
    });
  });

  describe('functions', () => {
    it('should call props.onSelect', () => {
      wrapper.find('SimpleOption').first().find('li').simulate('click');
      expect(props.onSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('navigation', () => {
    it('should search and active the correct item', () => {
      wrapper.instance().handleKeyPress({ key: 't' });
      expect(wrapper.state().active).toBe(2);
      wrapper.instance().handleKeyPress({ key: 'h' });
      expect(wrapper.state().active).toBe(3);
    });

    it('should go to the item above', () => {
      wrapper.instance().navigateUp(event);
      expect(wrapper.state().active).toBe(2);
      wrapper.instance().navigateUp(event);
      expect(wrapper.state().active).toBe(1);
      wrapper.instance().navigateUp(event);
      expect(wrapper.state().active).toBe(3);
    });

    it('should go to the item above when is no item selected', () => {
      wrapper.setState({ active: null });
      wrapper.instance().navigateUp(event);
      expect(wrapper.state().active).toBe(3);
    });

    it('should go to the item below', () => {
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe(1);
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe(2);
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe(3);
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe(1);
    });

    it('should go to the item below when is no item selected', () => {
      wrapper.setState({ active: null });
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe(1);
    });
  });
});

describe('<SelectOptions /> with group options', () => {
  let wrapper;
  const props = {
    id: 'ID',
    name: 'NAME',
    onSelect: jest.fn(),
    options: [
      { id: 1, value: 'One' },
      { id: 2, value: 'Two', options: [{ id: 4, value: 'Four' }, { id: 5, value: 'Five' }] },
      { id: 3, value: 'Three' }
    ],
    prompt: 'PROMPT',
    disabled: false,
    pullRight: false,
    tabIndex: '-1',
    textTruncate: false
  };
  const event = { preventDefault: jest.fn() };

  beforeAll(() => {
    wrapper = mount(<SelectOptions {...props} />);
    wrapper.setState({ open: true });
    wrapper.update();
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render 2 ul', () => {
      expect(wrapper.find('ul')).toHaveLength(2);
    });

    it('should render 2 SimpleOption', () => {
      expect(wrapper.find('SimpleOption')).toHaveLength(5);
    });

    it('should render 3 GroupOption', () => {
      expect(wrapper.find('GroupOption')).toHaveLength(1);
    });

    it('should render 3 SimpleOption and 1 ul', () => {
      expect(wrapper.find('GroupOption').first().find('SimpleOption')).toHaveLength(3);
      expect(wrapper.find('GroupOption').first().find('ul')).toHaveLength(1);
    });
  });

  describe('functions', () => {
    it('should call props.onSelect', () => {
      wrapper.find('GroupOption').last().find('SimpleOption').first()
        .simulate('click');
      expect(props.onSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('navigation', () => {
    it('should search and active the correct item', () => {
      wrapper.instance().handleKeyPress({ key: 'f' });
      expect(wrapper.state().active).toBe(4);
      wrapper.instance().handleKeyPress({ key: 'i' });
      expect(wrapper.state().active).toBe(5);
    });

    it('should go to the item above', () => {
      wrapper.instance().navigateUp(event);
      expect(wrapper.state().active).toBe(4);
      wrapper.instance().navigateUp(event);
      expect(wrapper.state().active).toBe(1);
    });

    it('should go to the item below', () => {
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe(4);
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe(5);
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe(3);
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe(1);
    });

    it('should go to the item above when is no item selected', () => {
      wrapper.setState({ active: null });
      wrapper.instance().navigateUp(event);
      expect(wrapper.state().active).toBe(3);
    });

    it('should go to the item below when is no item selected', () => {
      wrapper.setState({ active: null });
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe(1);
    });
  });
});

describe('<SelectOptions /> with simple options which is array of strings', () => {
  let wrapper;
  const props = {
    id: 'ID',
    name: 'NAME',
    onSelect: jest.fn(),
    options: ['One', 'Two', 'Three'],
    prompt: 'PROMPT',
    disabled: false,
    pullRight: false,
    tabIndex: '-1',
    textTruncate: false
  };
  const event = { preventDefault: jest.fn() };

  beforeEach(() => {
    wrapper = mount(<SelectOptions {...props} />);
    wrapper.setState({ open: true });
    wrapper.update();
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should render component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render 1 ul', () => {
      expect(wrapper.find('ul')).toHaveLength(1);
    });

    it('should render 3 SimpleOption', () => {
      expect(wrapper.find('SimpleOption')).toHaveLength(3);
    });

    it('should render 1 li and 1 a', () => {
      expect(wrapper.find('SimpleOption').first().find('li')).toHaveLength(1);
      expect(wrapper.find('SimpleOption').first().find('a')).toHaveLength(1);
    });
  });

  describe('functions', () => {
    it('should call props.onSelect', () => {
      wrapper.find('SimpleOption').first().find('li').simulate('click');
      expect(props.onSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('navigation', () => {
    it('should search and active the correct item', () => {
      wrapper.setProps({ ...props, options: ['one', 'two', 'three', 'four'] });
      wrapper.instance().handleKeyPress({ key: 'o' });
      expect(wrapper.state().active).toBe('one');
    });

    it('should go to the item above', () => {
      wrapper.setProps({ ...props, options: ['one', 'two', 'three', 'four'] });
      wrapper.instance().navigateUp(event);
      expect(wrapper.state().active).toBe('four');
      wrapper.instance().navigateUp(event);
      expect(wrapper.state().active).toBe('three');
    });

    it('should go to the item below', () => {
      wrapper.setProps({ ...props, options: ['one', 'two', 'three', 'four'] });
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe('one');
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe('two');
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe('three');
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe('four');
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe('one');
    });

    it('should go to the item above when is no item selected', () => {
      wrapper.setProps({ ...props, options: ['one', 'two', 'three', 'four'] });
      wrapper.instance().navigateUp(event);
      expect(wrapper.state().active).toBe('four');
    });

    it('should go to the item below when is no item selected', () => {
      wrapper.setProps({ ...props, options: ['one', 'two', 'three', 'four'] });
      wrapper.instance().navigateDown(event);
      expect(wrapper.state().active).toBe('one');
    });
  });
});
