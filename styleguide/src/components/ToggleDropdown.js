import React from 'react';
import ReactDOM from 'react-dom';

export default function toggleDropdown(WrappedComponent, allowInteractionWithin) {
  class ToggleDropdown extends React.Component {
    state = { dropdownVisible: false };

    componentWillUnmount() {
      document.body.removeEventListener('click', this.hideDropdown);
      document.body.removeEventListener('touchstart', this.touchHideDropdown);
    }

    showDropdown = () => {
      this.setState({ dropdownVisible: true });
      if (!this.listenerAdded) {
        this.listenerAdded = true;
        document.body.addEventListener('click', this.hideDropdown);
        document.body.addEventListener('touchstart', this.touchHideDropdown);
        if (this.props.enableKeyPress) {
          document.addEventListener('keypress', this.handleKeyPress);
        }
      }
    };

    hideDropdown = (e, force) => {
      if (force || !allowInteractionWithin || !this.dropdown || !this.dropdown.contains(e.target)) {
        this.setState({ dropdownVisible: false });
        this.listenerAdded = false;
        document.body.removeEventListener('click', this.hideDropdown);
        document.body.removeEventListener('touchstart', this.touchHideDropdown);
        if (this.props.enableKeyPress) {
          document.removeEventListener('keypress', this.handleKeyPress);
        }
      }
    };

    touchHideDropdown = (e) => {
      if (this.dropdown && !this.dropdown.contains(e.target)) {
        this.setState({ dropdownVisible: false });
        this.listenerAdded = false;
        document.body.removeEventListener('click', this.hideDropdown);
        document.body.removeEventListener('touchstart', this.touchHideDropdown);
      }
    };

    handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        this.hideDropdown(null, true);
      }
    };

    render() {
      return (
        <WrappedComponent
          ref={(dropdown) => {
            this.dropdown = ReactDOM.findDOMNode(dropdown);
          }}
          dropdownVisible={this.state.dropdownVisible}
          showDropdown={this.showDropdown}
          hideDropdown={this.hideDropdown}
          {...this.props}
        />
      );
    }
  }

  ToggleDropdown.displayName = `ToggleDropdown(${getDisplayName(WrappedComponent)})`;
  return ToggleDropdown;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
