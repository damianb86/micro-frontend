import React from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import classNames from 'classnames';

import 'rc-time-picker/assets/index.css';
import 'react-select/dist/react-select.css';
import NumberFormat from 'react-number-format';

import SelectOptions from '../SelectOptions';
import DatePicker from '../DatePicker';
import TextEditor from '../TextEditor';
import './index.scss';

const LabelledInput = ({ id, label, type, className, children, errors, help, ...props }) => {
  let inputField;

  if (type === 'select') {
    inputField = <SelectOptions id={id} {...props} />;
  } else if (type === 'date') {
    inputField = <DatePicker {...props} />;
  } else if (type === 'time') {
    inputField = <TimePicker {...props} />;
  } else if (type === 'ckeditor' || type === 'texteditor') {
    inputField = <TextEditor {...props} />;
  } else if (type === 'textarea') {
    inputField = <textarea id={id} {...props} />;
  } else if (type === 'currency') {
    inputField = <NumberFormat {...props} />;
  } else if (type === 'custom') {
    inputField = children;
  } else {
    inputField = <input type={type} id={id} {...props} />;
  }

  return (
    <div className={classNames('input-groups', className)}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      {inputField}
      {help && <p className="input-groups__help">{help}</p>}
      {errors && errors.length > 0
        ? errors.map(m => (
          <span key={m} className="field-error">
            {' '}
            {m}{' '}
          </span>
          ))
        : null}
    </div>
  );
};

LabelledInput.defaultProps = { type: 'text', help: '' };

LabelledInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  name: PropTypes.string,
  type: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  help: PropTypes.string
};

export default LabelledInput;
