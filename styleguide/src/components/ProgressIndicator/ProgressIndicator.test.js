import React from 'react';
import { shallow } from 'enzyme';
import ProgressIndicator from '../../../../src/components/common/ProgressIndicator';

const steps = [{ state: 'completed' }, { state: 'completed' }, { state: 'active' }, { state: 'validated' }, { state: 'inactive' }];

describe('<ProgressIndicator />', () => {
  const wrapper = shallow(<ProgressIndicator steps={steps} />);

  it('should render ProgressIndicator component', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render all the steps', () => {
    expect(wrapper.find('Step')).toHaveLength(steps.length);
  });

  it('should show two completed steps', () => {
    expect(
      wrapper
        .find('Step')
        .at(0)
        .dive()
        .find('.progress-indicator__item__indicator')
        .hasClass('completed')
    ).toEqual(true);
    expect(
      wrapper
        .find('Step')
        .at(0)
        .dive()
        .find('.progress-indicator__item__splitter')
        .hasClass('completed')
    ).toEqual(true);

    expect(
      wrapper
        .find('Step')
        .at(1)
        .dive()
        .find('.progress-indicator__item__indicator')
        .hasClass('completed')
    ).toEqual(true);
    expect(
      wrapper
        .find('Step')
        .at(1)
        .dive()
        .find('.progress-indicator__item__splitter')
        .hasClass('completed')
    ).toEqual(true);
  });

  it('should show one active step', () => {
    expect(
      wrapper
        .find('Step')
        .at(2)
        .dive()
        .find('.progress-indicator__item__indicator')
        .hasClass('active')
    ).toEqual(true);
    expect(
      wrapper
        .find('Step')
        .at(2)
        .dive()
        .find('.progress-indicator__item__splitter')
        .hasClass('active')
    ).toEqual(true);
  });

  it('should show one validated step', () => {
    expect(
      wrapper
        .find('Step')
        .at(3)
        .dive()
        .find('.progress-indicator__item__indicator')
        .hasClass('validated')
    ).toEqual(true);
    expect(
      wrapper
        .find('Step')
        .at(3)
        .dive()
        .find('.progress-indicator__item__splitter')
        .hasClass('validated')
    ).toEqual(true);
  });

  it('should show one inactive step', () => {
    expect(
      wrapper
        .find('Step')
        .at(4)
        .dive()
        .find('.progress-indicator__item__indicator')
        .hasClass('inactive')
    ).toEqual(true);
    expect(
      wrapper
        .find('Step')
        .at(4)
        .dive()
        .find('.progress-indicator__item__splitter')
        .hasClass('inactive')
    ).toEqual(true);
  });
});
