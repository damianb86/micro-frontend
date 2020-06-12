import React from 'react';
import PropTypes from 'prop-types';

const BACKSPACE_KEY_CODE = 8;
const DELETE_KEY_CODE = 46;
export default class RemovableSearchTag extends React.Component {
  onRemove = () => this.props.onRemove(this.props.name);

  onKeyDown = e => {
    const key = e.keyCode || e.charCode;
    if (key === BACKSPACE_KEY_CODE || key === DELETE_KEY_CODE) {
      const previousNode = e.target.previousSibling;
      if (previousNode) {
        previousNode.focus();
      }
      this.onRemove(e);
    }
  };

  render() {
    const removable = !!this.props.onRemove;

    return (
      <div
        tabIndex={removable ? '0' : null}
        onKeyDown={removable ? this.onKeyDown : null}
        className={this.props.isChips ? 'removeable-chips' : 'tags-wrapper__tag'}
      >
        <span className="tags-wrapper__tag__name">{this.props.children}</span>
        {removable ? (
          <a
            onClick={this.onRemove}
            className={this.props.isChips ? 'removeable-chips__delete' : 'tags-wrapper__tag__delete'}
          >
            X
          </a>
        ) : null}
      </div>
    );
  }
}

RemovableSearchTag.defaultProps = {
  isChips: false
};

RemovableSearchTag.propTypes = {
  isChips: PropTypes.bool,
  children: PropTypes.node,
  onRemove: PropTypes.func,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object])
};
