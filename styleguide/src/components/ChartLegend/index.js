/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

class ChartLegend extends React.Component {
  state = { disable: {}, itemOver: null };

  handleClick = (e) => {
    const { id } = e.target.parentNode;
    if (id) {
      const currentStatus = this.state.disable[id];
      const disableItems = { ...this.state.disable, [id]: !currentStatus };

      this.setState({ disable: disableItems, itemOver: currentStatus ? id : null });
      this.props.onDisable(id, !currentStatus);
    }
  };

  handleMouseLeave = () => {
    this.setState({ itemOver: null });
    this.props.onMouseLeave();
  };

  handleMouseOver = (e) => {
    const itemOver = e.target.parentNode.id;
    if (!this.state.disable[itemOver]) {
      this.setState({ itemOver });
    } else {
      this.setState({ itemOver: null });
    }

    this.props.onMouseOver(itemOver);
  };

  render() {
    const { disable, itemOver } = this.state;
    const { items } = this.props;

    return (
      <ul className="legends" onMouseLeave={this.handleMouseLeave}>
        {items.map(item => (
          <li key={item.key}>
            <a
              id={item.key}
              className={`legends__item ${disable[item.key] ? 'disable' : ''} ${itemOver === null || itemOver === item.key ? '' : 'blur'}`}
              onClick={this.handleClick}
              onMouseOver={this.handleMouseOver}
            >
              <span className="legends__item__color" style={{ backgroundColor: item.color }}>&nbsp;</span>
              <span className="legends__item__label">{item.label || item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }
}

ChartLegend.defaultProps = {
  onMouseLeave: () => {},
  onMouseOver: () => {},
  onDisable: () => {}
};

ChartLegend.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      name: PropTypes.string,
      key: PropTypes.string,
      color: PropTypes.string
    })
  ).isRequired,
  onMouseLeave: PropTypes.func,
  onMouseOver: PropTypes.func,
  onDisable: PropTypes.func
};

export default ChartLegend;
