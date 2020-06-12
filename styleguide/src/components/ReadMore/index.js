import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DomPurify from 'dompurify';

import UpArrow from '../../../icons/icon-12-chevron-up.svg';
import DownArrow from '../../../icons/icon-12-chevron-down.svg';
import { isRich } from '../../../helpers/common';

import './index.scss';
import useToggle from '../../../hooks/useToggle';

function simpleFormat(str) {
  let newStr = str.replace(/\r\n?/, '\n').trim();
  if (newStr.length > 0) {
    newStr = newStr.replace(/\n\n+/g, '</p><p>');
    newStr = newStr.replace(/\n/g, '<br />');
  }
  return newStr;
}

const ReadMore = ({
  content,
  limitLines,
  lineHeight,
  padding,
  moreText,
  lessText,
  showLessTextIcon,
  showMoreTextIcon,
  attachment,
  formatText,
  className
}) => {
  const [isExpanded, expand, collapse] = useToggle(false);
  const [controlsVisible, setControlsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const resizeListener = () => {
      setControlsVisible(containerRef.current.offsetHeight < containerRef.current.scrollHeight);
    };
    window.addEventListener('resize', resizeListener);
    resizeListener();

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [content]);

  const style = {
    maxHeight: (lineHeight * limitLines) + padding,
    WebkitLineClamp: limitLines
  };

  return (
    <section className={classNames('read-more clearfix', className, { expand: isExpanded })}>
      <div className={classNames({ 'read-more__expanded': isExpanded, 'read-more__truncated': !isExpanded })}>
        <div
          className="read-more__content"
          style={isExpanded ? {} : style}
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: DomPurify.sanitize(formatText ? simpleFormat(content) : content) }}
        />
      </div>
      {attachment && <div className="read-more__attachment" dangerouslySetInnerHTML={{ __html: DomPurify.sanitize(attachment) }} />}
      {controlsVisible && (
        <a className="sky-text" onClick={isExpanded ? collapse : expand} role="button" tabIndex={0}>
          {isExpanded ? lessText : moreText}
          {isExpanded ? showLessTextIcon && <UpArrow /> : showMoreTextIcon && <DownArrow />}
        </a>
      )}
    </section>
  );
};

ReadMore.defaultProps = {
  limitLines: 5,
  lineHeight: 19,
  padding: 0,
  lessText: 'less',
  moreText: 'more',
  showLessTextIcon: false,
  showMoreTextIcon: false,
  attachment: '',
  formatText: true
};

ReadMore.propTypes = {
  limitLines: PropTypes.number,
  lineHeight: PropTypes.number,
  padding: PropTypes.number,
  lessText: PropTypes.string,
  moreText: PropTypes.string,
  showLessTextIcon: PropTypes.bool,
  showMoreTextIcon: PropTypes.bool,
  attachment: PropTypes.string,
  content: PropTypes.string,
  formatText: PropTypes.bool,
  className: PropTypes.string
};

export default ReadMore;
