import React from 'react';
import PropTypes from 'prop-types';

import TabsSlider from '../../common/TabsSlider';
import './index.scss';

const TabsSliderIcons = ({ className, tabs, counts, viewBadges, onChangeTab, currentTab }) => (
  <TabsSlider
    tabs={mapTabsContent(tabs, counts, viewBadges)}
    currentTab={currentTab}
    className={`tabs-slider-icons__tabs ${className}`}
    onChangeTab={onChangeTab}
  />
);

TabsSliderIcons.defaultProps = {
  className: '',
  tabs: [],
  counts: {},
  viewBadges: {},
  onChangeTab: () => null
};

TabsSliderIcons.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.any,
    title: PropTypes.string
  })),
  counts: PropTypes.object,
  viewBadges: PropTypes.object,
  onChangeTab: PropTypes.func,
  currentTab: PropTypes.string
};

export default TabsSliderIcons;

export function mapTabsContent(tabs, counts, viewBadges) {
  return tabs.map(tab => ({
    ...tab,
    content: (
      <React.Fragment>
        {tab.content}
        {viewBadges[tab.id] && <span className="badge badge-round-on-top badge-visible-section" />}
        {counts[tab.id] && <span className="count">({counts[tab.id]})</span>}
      </React.Fragment>),
    selectedContent: tab.selectedContent && (
      <React.Fragment>
        {tab.selectedContent}
        {viewBadges[tab.id] && <span className="badge badge-round-on-top badge-visible-section" />}
        {counts[tab.id] && <span className="count">({counts[tab.id]})</span>}
      </React.Fragment>)
  }));
}
