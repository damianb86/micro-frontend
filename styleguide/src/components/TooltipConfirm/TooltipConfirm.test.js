import React from 'react';
import { shallow } from 'enzyme';
import TooltipConfirm from './index';

describe('<TooltipConfirm />', () => {
  let wrapper;
  let TooltipContent;
  let props;
  beforeAll(() => {
    props = {
      showTooltip: true,
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
      confirmationText: 'Confirmation text'
    };
    wrapper = shallow(<TooltipConfirm {...props}><div className="child">Child</div></TooltipConfirm>);
    TooltipContent = wrapper.find('TooltipContent').dive();
  });

  it('should render TooltipConfirm', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render the child component', () => {
    expect(wrapper.find('.child')).toHaveLength(1);
  });

  it('should render TooltipContent', () => {
    expect(wrapper.find('TooltipContent')).toHaveLength(1);
  });

  it('should render p with text "Confirmation text"', () => {
    expect(TooltipContent.find('p').text()).toBe('Confirmation text');
  });

  it('should render "yes" and "no" buttons', () => {
    expect(TooltipContent.find('.tooltip-confirm__content__options__yes')).toHaveLength(1);
    expect(TooltipContent.find('.tooltip-confirm__content__options__no')).toHaveLength(1);
  });

  it('should not render TooltipContent component', () => {
    wrapper.setProps({ showTooltip: false });
    wrapper.update();
    expect(wrapper.find('TooltipContent')).toHaveLength(0);
  });

  describe('functions', () => {
    it('should call onConfirm', () => {
      TooltipContent.find('.tooltip-confirm__content__options__yes').simulate('click');
      expect(props.onConfirm.mock.calls).toHaveLength(1);
    });

    it('should call onCancel', () => {
      TooltipContent.find('.tooltip-confirm__content__options__no').simulate('click');
      expect(props.onCancel.mock.calls).toHaveLength(1);
    });

    it('should call onCancel when click ousite', () => {
      wrapper = shallow(<TooltipConfirm {...props} />);
      wrapper.find('TooltipContent').dive().instance().handleOutsideClick({ target: { className: 'outside' } });
      expect(props.onCancel.mock.calls).toHaveLength(2);
    });
  });
});
