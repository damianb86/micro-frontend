import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });

    if (window.Sentry) {
      window.Sentry.withScope((scope) => {
        scope.setExtra('extra', info);
        window.Sentry.captureException(error);
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return <h2 style={{ color: '#a94442' }}>We are sorry something went wrong.</h2>;
    }
    return this.props.children;
  }
}
