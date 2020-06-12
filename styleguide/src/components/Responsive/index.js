import React from 'react';
import Responsive, { useMediaQuery } from 'react-responsive';

export const desktopMinWidth = 769;
export const mobileMaxWidth = 768;

const ResponsiveWrapper = ({ isVisible, isHidden, children, ...props }) => {
  if (isHidden) {
    return null;
  }

  return isVisible ? children : <Responsive {...props} values={window.testMediaQueryValues}>{children}</Responsive>;
};

const isResponsiveWrapper = ({ isVisible, isHidden, children, query } = {}) => {
  if (isHidden) {
    return null;
  }

  return isVisible ? children : useMediaQuery({ query });
};

export const Desktop = ({ isVisible, isHidden, ...props }) =>
  ResponsiveWrapper({ isVisible, isHidden, minWidth: desktopMinWidth, ...props });

export const Mobile = ({ isVisible, isHidden, ...props }) =>
  ResponsiveWrapper({ isVisible, isHidden, maxWidth: mobileMaxWidth, ...props });

export const isDesktop = ({ isVisible, isHidden, children }) =>
  isResponsiveWrapper({ isVisible, isHidden, children, query: `(min-width: ${desktopMinWidth}px)` });

export const isMobile = ({ isVisible, isHidden, children } = {}) =>
  isResponsiveWrapper({ isVisible, isHidden, children, query: `(max-width: ${mobileMaxWidth}px)` });
