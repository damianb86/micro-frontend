import React, { Component } from 'react';

const SCORE_WORDS = {
  0: { label: 'weak', color: 'red' },
  0.1: { label: 'weak', color: 'red' },
  1: { label: 'weak', color: 'red' },
  2: { label: 'weak', color: 'red' },
  3: { label: 'good', color: '#29aae1' },
  4: { label: 'strong', color: 'green' }
};

export default class PasswordStrengthIndicator extends Component {
  state = { pwdStrength: 0 };

  componentWillReceiveProps(nextProps) {
    const score = nextProps.score;
    this.setState({ pwdStrength: score === 0 ? 0.1 : score });
  }

  render() {
    const obj = SCORE_WORDS[this.state.pwdStrength];
    const style = obj
      ? {
          width: `${this.state.pwdStrength * 25}%`,
          backgroundColor: obj.color,
          height: '13px'
        }
      : {
          width: '0px',
          height: '13px'
        };

    return (
      <div>
        <div className="password-strength-meter">
          <div className="password-strength-meter__item" style={style} />
        </div>
        {this.state.pwdStrength > 0 ? (
          <span className="password-strength-text" style={{ color: obj.color }}>
            <i>{obj.label}</i>
          </span>
        ) : null}
      </div>
    );
  }
}
