import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import StatusReportCardMobile from './index';
import { STATUS_REPORT_CARD_ITEMS } from '../../../../../__test__/fixtures/common/StatusReportCard';

describe('<StatusReportCardMobile/>', () => {
  let wrapper;
  const props = {
    title: 'Title Test',
    items: STATUS_REPORT_CARD_ITEMS,
    showCandidateSidePanel: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(<IntlProvider locale="en"><StatusReportCardMobile {...props} /></IntlProvider>);
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should render <StatusReportCardMobile/> component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render a CollapsibleCard', () => {
      expect(wrapper.find('CollapsibleCard')).toHaveLength(1);
    });

    it('should render 4 StatusReportCardItemMobile', () => {
      expect(wrapper.find('StatusReportCardItemMobile')).toHaveLength(4);
    });
  });

  describe('StatusReportCardItemMobile', () => {
    let statusReportCardItem;

    beforeAll(() => {
      statusReportCardItem = wrapper.find('StatusReportCardItemMobile').first();
    });

    it('should render the Avatar', () => {
      expect(statusReportCardItem.find('Avatar')).toHaveLength(1);
    });

    it('click on avatar should call `showCandidateSidePanel` action', () => {
      const getAttribute = jest.fn();

      statusReportCardItem.find('.status-report-card__item__avatar').simulate('click', { target: { parentElement: { getAttribute } } });
      expect(props.showCandidateSidePanel).toHaveBeenCalledTimes(1);
    });

    it('should render the name', () => {
      expect(statusReportCardItem.find('.status-report-card__item__info__name > .row-name').text()).toBe('Baron Davis');
    });

    it('click on name should call `showCandidateSidePanel` action', () => {
      const getAttribute = jest.fn();

      statusReportCardItem.find('.status-report-card__item__info__name > .row-name').simulate('click', { target: { getAttribute } });
      expect(props.showCandidateSidePanel).toHaveBeenCalledTimes(1);
    });

    it('should render 2 linked icons', () => {
      expect(statusReportCardItem.find('.status-report-card__item__info__icons a')).toHaveLength(2);
    });

    it('should render 2 linked icons', () => {
      expect(statusReportCardItem.find('.status-report-card__item__info__icons a')).toHaveLength(2);
    });

    it('should render a RatingStars', () => {
      expect(statusReportCardItem.find('RatingStars')).toHaveLength(1);
    });

    it('should render the company and position row', () => {
      expect(statusReportCardItem.find('.status-report-card__item__info__company-position').text()).toBe('Apple SRL, Vp Product Manager');
    });

    it('should render the phone and email row', () => {
      expect(statusReportCardItem.find('.status-report-card__item__info__phone-email').text()).toBe('12315456789 / baron.davis@email.com');
    });

    it('should render the 3 different dates', () => {
      expect(statusReportCardItem.find('.status-report-card__item__info__dates__added span').last().text()).toBe('10/10/2018');
      expect(statusReportCardItem.find('.status-report-card__item__info__dates__presented span').last().text()).toBe('11/21/2018');
      expect(statusReportCardItem.find('.status-report-card__item__info__dates__updated span').last().text()).toBe('12/11/2018');
    });

    it('should render a ReadMore', () => {
      expect(statusReportCardItem.find('ReadMore')).toHaveLength(1);
    });

    it('should render the note info row', () => {
      expect(statusReportCardItem.find('.status-report-card__item__note__info').text()).toBe('Call · David Ly · 10/25/2017');
    });
  });
});
