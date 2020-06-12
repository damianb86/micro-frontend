import React, { useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getScrollParent, windowWidth, windowHeight } from '../../../helpers/common';
import useToggle from '../../../hooks/useToggle';

import { elementTypePropTypeChecker } from '../../../propTypes';
import './index.scss';

const DropdownButton = ({
  open,
  title,
  id,
  disabled,
  tabIndex,
  borderLess,
  onOpen,
  onClose,
  onClickOutside,
  onKeyPress,
  className,
  children,
  dynamicPosition,
  style,
  isCaretVisible
}) => {
  const nodeRef = useRef();
  const childNodeRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    return open ? onClose() : onOpen();
  };

  const handleClickOutside = (e) => {
    if (!nodeRef.current.contains(e.target)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.addEventListener('click', handleClickOutside);
      document.body.addEventListener('touchstart', handleClickOutside);
      return () => {
        document.body.removeEventListener('click', handleClickOutside);
        document.body.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [open]);

  useLayoutEffect(() => {
    if (open && dynamicPosition) {
      // We consider dropdown to open in bottom right as default
      // Get Dropdown Element which is childNodeRef of wrapper
      const childElem = (childNodeRef.current && childNodeRef.current.firstChild);
      const { height: buttonHeight, width: buttonWidth } = nodeRef.current.getBoundingClientRect();

      // Since we don't want to fall in a loop of left-right switching dropdowns, we are adding an error in calculations for left and top side hidden dropdowns
      const errorInPixelCalc = 15;

      if (childElem) {
        // Get co-ordinates for dropdown element
        const {
          bottom: dropdownBottom,
          left: dropdownLeft,
          right: dropdownRight,
          top: dropdownTop,
          width: dropdownWidth,
          height: dropdownHeight
        } = childElem.getBoundingClientRect();

        // Find first scrollable parent i.e. where overflow outside will be hidden
        const scrollableParent = getScrollParent(nodeRef.current);

        // Get co-ordinates of first scrollable parent
        const {
          bottom: scrollParentBottom,
          left: scrollParentLeft,
          right: scrollParentRight,
          top: scrollParentTop
        } = scrollableParent ? scrollableParent.getBoundingClientRect() : {};

        // Find visible co-ordinates wrt to the dropdown
        const visibleLeft = Math.max(0, scrollParentLeft);
        const visibleTop = Math.max(0, scrollParentTop);
        const visibleRight = Math.min(windowWidth, scrollParentRight);
        const visibleBottom = Math.min(windowHeight, scrollParentBottom);

        // Check if dropdown visible in X and Y context
        const isDropdownVisibleX = dropdownLeft > visibleLeft && dropdownRight < visibleRight;
        const isDropdownVisibleY = dropdownTop > visibleTop && dropdownBottom < visibleBottom;

        // If dropdown not visible in X axis positive direction, check if it can be reverse opened
        if (!isDropdownVisibleX && ((dropdownLeft + buttonWidth) - dropdownWidth) > visibleLeft) {
          childElem.classList.add('dropdown-right-align');
        }

        // If dropdown not visible in X axis negative direction, check if it can be reverse opened
        if (!isDropdownVisibleX && ((dropdownRight - buttonWidth) + dropdownWidth + errorInPixelCalc) < visibleRight) {
          childElem.classList.add('dropdown-left-align');
        }

        // If dropdown not visible in Y axis positive direction, check if it can be reverse opened
        if (!isDropdownVisibleY && ((dropdownTop - buttonHeight) - dropdownHeight) > visibleTop) {
          childElem.classList.add('dropdown-top-align');
          childElem.style.marginBottom = `${buttonHeight + 2}px`;
        }

        // If dropdown not visible in Y axis negative direction, check if it can be reverse opened
        if (!isDropdownVisibleY && (dropdownBottom + buttonHeight + dropdownHeight + errorInPixelCalc) < visibleBottom) {
          childElem.classList.add('dropdown-bottom-align');
        }
      }
    }
  }, [open]);

  return (
    <div ref={nodeRef} className={`dropdown-button ${className}`}>
      <button
        className={classNames('dropdown-button__button btn btn-primary', { borderLess })}
        id={id}
        disabled={disabled}
        tabIndex={tabIndex}
        onKeyPress={onKeyPress}
        onClick={handleClick}
        style={style}
      >
        {title}
        {isCaretVisible && <span className="caret" />}
      </button>
      <div ref={childNodeRef}>
        {open && children}
      </div>
    </div>
  );
};

DropdownButton.defaultProps = {
  open: false,
  disabled: false,
  borderLess: false,
  className: '',
  onOpen: () => null,
  onClose: () => null,
  onClickOutside: () => null,
  onKeyPress: () => null,
  dynamicPosition: true,
  isCaretVisible: true
};

DropdownButton.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  tabIndex: PropTypes.string,
  className: PropTypes.string,
  borderLess: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onClickOutside: PropTypes.func,
  onKeyPress: PropTypes.func,
  children: PropTypes.oneOfType([elementTypePropTypeChecker, PropTypes.node]),
  dynamicPosition: PropTypes.bool,
  style: PropTypes.object,
  isCaretVisible: PropTypes.bool
};

export default DropdownButton;

export const DropdownContent = ({ children, pullRight, isMobileResponsive }) => (
  <div className={classNames('dropdown-button__content', { 'pull-right': pullRight, isMobileResponsive })}>
    {children}
  </div>
);

DropdownContent.defaultProps = { pullRight: false };

DropdownContent.propTypes = {
  children: PropTypes.oneOfType([elementTypePropTypeChecker, PropTypes.node]),
  pullRight: PropTypes.bool
};

export const DropdownContentButtons = ({
  children,
  onCancel,
  onApply,
  cancelText,
  applyText,
  disabled,
  pullRight,
  isMobileResponsive
}) => (
  <DropdownContent pullRight={pullRight} isMobileResponsive={isMobileResponsive}>
    {children}
    <div className="dropdown-button__content__buttons">
      <button className="btn pri-button" onClick={onApply} disabled={disabled}>{applyText}</button>
      <button className="btn sec-button" onClick={onCancel}>{cancelText}</button>
    </div>
  </DropdownContent>
);

DropdownContentButtons.defaultProps = {
  cancelText: 'Cancel',
  applyText: 'Apply',
  pullRight: false,
  disabled: false,
  isMobileResponsive: false
};

DropdownContentButtons.propTypes = {
  onCancel: PropTypes.func,
  onApply: PropTypes.func,
  cancelText: PropTypes.string,
  applyText: PropTypes.string,
  pullRight: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([elementTypePropTypeChecker, PropTypes.node]),
  isMobileResponsive: PropTypes.bool
};

export const DropdownWrapper = ({ children }) => {
  const [isOpen, setOpen, setClose] = useToggle(false);

  return children({ isOpen, setOpen, setClose });
};

DropdownWrapper.propTypes = { children: PropTypes.oneOfType([elementTypePropTypeChecker, PropTypes.node]) };
