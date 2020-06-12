import React from 'react';

export default function withModal(WrappedComponent) {
  class WithModal extends React.Component {
    state = { modalIsOpen: false };

    openModal = () => this.setState({ modalIsOpen: true });

    closeModal = () => this.setState({ modalIsOpen: false });

    toggleModal = () => this.setState(({ modalIsOpen }) => ({ modalIsOpen: !modalIsOpen }));

    render() {
      const props = {
        ...this.props,
        modalIsOpen: this.state.modalIsOpen,
        openModal: this.openModal,
        closeModal: this.closeModal,
        toggleModal: this.toggleModal
      };

      return <WrappedComponent {...props} />;
    }
  }

  WithModal.displayName = `WithModal(${getDisplayName(WrappedComponent)})`;
  return WithModal;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
