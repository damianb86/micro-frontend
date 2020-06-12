import React from 'react';
import PropTypes from 'prop-types';

import IconLink from './IconLink';
import '../../styles/menu_context.css';
import { capitalize } from '../../string';

export default class DisplayStyleList extends React.Component {
  state = {
    menuVisibility: false
  };

  componentDidMount() {
    document.addEventListener('click', this.toggleMenuOff);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleMenuOff);
  }

  toggleMenuOn = e => {
    e.preventDefault();
    if (!this.state.menuVisibility) {
      this.setState({ menuVisibility: true });
    }
  };

  toggleMenuOff = e => {
    if (
      this.state.menuVisibility &&
      e.target !== this.element &&
      e.target !== this.menu &&
      !this.menu.contains(e.target) &&
      !this.element.contains(e.target)
    ) {
      this.setState({ menuVisibility: false });
    }
  };

  handleOnclick = e => {
    e.preventDefault();
    this.props.onClickItem({ view: this.props.type, displayStyle: e.target.dataset.value });
  };

  render() {
    let menuClass = 'context-menu list-unstyled ';
    menuClass += this.state.menuVisibility ? 'context-menu--active' : '';

    return (
      <div style={{ position: 'relative' }}>
        <div
          ref={elm => {
            this.element = elm;
          }}
          onContextMenu={this.toggleMenuOn}
          onClick={this.props.onClickTriggerItem}
        >
          {this.props.children}
        </div>
        <ul
          ref={elm => {
            this.menu = elm;
          }}
          className={menuClass}
        >
          {this.props.items.map((item, i) => {
            const linkType = `${this.props.type}-${item}-menu`;
            return (
              <li className="context-menu__item" key={i}>
                <IconLink
                  type={linkType}
                  size="sm"
                  active={this.props.selected === item}
                  className="icon-link-sm"
                  onClick={this.handleOnclick}
                  value={item}
                >
                  {capitalize(item)}
                </IconLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

DisplayStyleList.propTypes = {
  children: PropTypes.node.isRequired,
  onClickTriggerItem: PropTypes.func,
  items: PropTypes.array,
  selected: PropTypes.string
};

DisplayStyleList.defaultProps = {
  onClickTriggerItem: function() {
    return null;
  },
  selected: 'normal',
  items: ['condensed', 'normal', 'expanded'],
  type: 'list'
};
