import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/rating.css';

export default class Rating extends Component {
  state = {
    clicked: false
  };

  handleRating = e => {
    this.setState({ clicked: true });
    const params = {
      id: this.props.id,
      type: this.props.type
    };

    this.props.handleRating(e, params).then(response => {
      setTimeout(() => {
        this.setState({ clicked: false });
      }, 1000);
    });
  };

  getAnimClass() {
    return this.state.clicked ? `thumbs-${this.props.type}-text-animation` : 'hide';
  }

  render() {
    const type = this.props.type;
    const textAni = type === 'up' ? '+1' : '-1';
    /* eslint-disable jsx-a11y/anchor-has-content */
    return (
      <div className="rating-wrapper">
        <div className={`rating-wrapper__circle thumbs-${type}-circle ${this.state.clicked ? 'glow-animation' : ''}`}>
          <a className={`rating-icon thumbs-${type}-icon`} onClick={this.handleRating} />
        </div>
        <span className={`rating-wrapper__text thumbs-${type}-text ${this.getAnimClass()}`}>{textAni}</span>
      </div>
    );

    /* eslint-enable jsx-a11y/anchor-has-content */
  }
}

Rating.defaultProps = {
  type: 'up'
};

Rating.propTypes = {
  type: PropTypes.string
};
