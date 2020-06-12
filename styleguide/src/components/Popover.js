import React from 'react';
import IconLink from './IconLink';
import PropTypes from 'prop-types';

export default class Popover extends React.Component {
  state = {};

  minimize = () => this.setState({ minimize: !this.state.minimize });
  close = () => this.props.history.push(this.props.closePath);
  maximize = () => this.setState({ maximize: !this.state.maximize });

  renderHeaderTitle() {
    if (this.state.minimize) {
      return (
        <IconLink type={this.props.type} className="icon-link title" disabled>
          {this.props.headerTitle}
        </IconLink>
      );
    }
  }

  render() {
    let minimizeButton = (
      <li>
        <IconLink onClick={this.minimize} type="minimize" />
      </li>
    );
    let parentClass = 'details-view';
    let titleBarClass = 'details-view__title-bar clearfix';
    parentClass += this.state.maximize ? ' details-view--maximize' : '';
    parentClass += this.state.minimize ? ' details-view--minimize' : '';
    titleBarClass += this.state.minimize ? ' details-view__title-bar--minimize' : '';

    return (
      <section className={parentClass}>
        {this.renderHeaderTitle()}
        <section className={titleBarClass}>
          <ul className="list-unstyled details-view__title-bar__right">
            {minimizeButton}
            <li>
              <IconLink onClick={this.maximize} type="maximize" />
            </li>
            <li>
              <IconLink onClick={this.close} type="close" />
            </li>
          </ul>
        </section>
        {!this.state.minimize ? this.props.children : null}
      </section>
    );
  }
}

Popover.propTypes = {
  headerTitle: PropTypes.string,
  closePath: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node
};
