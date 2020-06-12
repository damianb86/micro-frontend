import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './index.scss';

const TabsSlider = ({ className, tabs, currentTab, onChangeTab }) => {
  const contentRef = useRef(null);
  const handleChangeTab = (title, ref) => {
    contentRef.current.scrollLeft = ref.current.offsetLeft - contentRef.current.offsetLeft;
    onChangeTab(title);
  };

  return (
    <div className={classNames('tabs-slider', className)} ref={contentRef}>
      <ul>
        {tabs.map((tab, index) => <TabLink key={tab.id || index} tab={tab} currentTab={currentTab} onChangeTab={handleChangeTab} />)}
      </ul>
    </div>
  );
};

TabsSlider.defaultProps = { tabs: [], className: '' };

TabsSlider.propTypes = {
  tabs: PropTypes.array,
  onChangeTab: PropTypes.func,
  className: PropTypes.string
};

export default TabsSlider;


const TabLink = ({ tab, onChangeTab, currentTab }) => {
  if (typeof tab === 'string') {
    return <TabLinkSimple title={tab} currentTab={currentTab} onChangeTab={onChangeTab} />;
  }
  if (tab.url) {
    return <TabLinkNav url={tab.url} text={tab.text} />;
  }

  return (
    <TabLinkCustom
      title={tab.title}
      content={tab.content}
      selectedContent={tab.selectedContent}
      id={tab.id}
      currentTab={currentTab}
      onChangeTab={onChangeTab}
    />
  );
};

const TabLinkSimple = ({ title, currentTab, onChangeTab }) => {
  const liRef = useRef(null);

  return (
    <li className="tabs-slider__item tabs-slider__item__simple" ref={liRef}>
      <a
        className={classNames('tabs-slider__item__link', { 'tabs-slider__item__link--active': title === currentTab })}
        title={title}
        onClick={() => onChangeTab(title, liRef)}
        role="link"
        tabIndex="0"
      >
        {title}
      </a>
    </li>
  );
};

TabLinkSimple.propsTypes = {
  title: PropTypes.string,
  currentTab: PropTypes.string,
  onChangeTab: PropTypes.func
};

const TabLinkNav = ({ url, text }) => (
  <li className="tabs-slider__item tabs-slider__item__nav">
    <NavLink
      exact={true}
      to={url}
      title={text}
      className="tabs-slider__item__link"
      activeClassName="tabs-slider__item__link--active"
    >
      {text}
    </NavLink>
  </li>
);

TabLinkNav.propsTypes = {
  url: PropTypes.string,
  text: PropTypes.string
};

const TabLinkCustom = ({ title, content, selectedContent, id, currentTab, onChangeTab }) => {
  const liRef = useRef(null);

  return (
    <li className="tabs-slider__item tabs-slider__item__custom" ref={liRef}>
      <a
        className={classNames('tabs-slider__item__link', { 'tabs-slider__item__link--active': id === currentTab })}
        title={title}
        onClick={() => onChangeTab(id, liRef)}
        role="link"
        tabIndex="0"
      >
        {id === currentTab && selectedContent ? selectedContent : content}
      </a>
    </li>
  );
};

TabLinkCustom.propsTypes = {
  title: PropTypes.string,
  content: PropTypes.any,
  selectedContent: PropTypes.any,
  id: PropTypes.string,
  currentTab: PropTypes.string,
  onChangeTab: PropTypes.func
};
