/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

const SelectOptions = ({ options, cursor, handleSelect, isLoadMoreEnable, onLoadMore }) => {
  const ulRef = useRef();

  const onScroll = () => {
    const scrollSpaceRemaining = ulRef.current.scrollHeight - ulRef.current.scrollTop - ulRef.current.clientHeight;
    if (scrollSpaceRemaining < 20) {
      onLoadMore();
    }
  };

  return (
    <ul className="search-select-multi__list" onScroll={isLoadMoreEnable ? throttle(onScroll, 300) : undefined} ref={ulRef}>
      {options.map((option, i) => (
        <li
          key={option.id}
          data-value={option.name}
          data-label={option.id}
          className={`search-select-multi__list__item ${cursor === i ? 'active' : ''}`}
          onClick={handleSelect}
          title={option.name}
        >
          {option.name}
        </li>
      ))}
    </ul>
  );
};

SelectOptions.defaultProps = {
  isLoadMoreEnable: false,
  onLoadMore: () => null
};

SelectOptions.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ).isRequired,
  handleSelect: PropTypes.func,
  cursor: PropTypes.number,
  onLoadMore: PropTypes.func,
  isLoadMoreEnable: PropTypes.bool
};

export default SelectOptions;
