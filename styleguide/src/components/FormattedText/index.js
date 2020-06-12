import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.scss';

const FormattedText = ({ text, className }) => {
  if (text) {
    return (
      <span
        className={classNames('formatted-text', className)}
        title={text}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  return null;
};

FormattedText.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export default FormattedText;
