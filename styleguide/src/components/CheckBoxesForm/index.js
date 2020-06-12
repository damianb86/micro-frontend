import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import ActiveForm from '../ActiveForm';
import CheckBox from '../CheckBox';
import { addOrRemoveArrayItem } from '../../../helpers/common';
import './index.scss';

const CheckBoxesForm = ({ items, itemsSelected, onSubmit, onCancel, submitButton }) => {
  const [currentItemsSelected, setCurrentItemsSelected] = useState(itemsSelected);

  const handleSelect = ({ target: { name } }) => {
    setCurrentItemsSelected(addOrRemoveArrayItem(currentItemsSelected, name));
  };

  const handleSubmit = () => onSubmit(currentItemsSelected);

  return (
    <ActiveForm
      submitButton={submitButton}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      disabled={isEqual(currentItemsSelected, itemsSelected)}
    >
      <div className="checkboxes-form__checkbox">
        {items.map(item => (
          <CheckBox
            {...item}
            label={item.label || item.name}
            checked={currentItemsSelected.includes(item.name)}
            onChange={handleSelect}
          />
        ))}
      </div>
    </ActiveForm>
  );
};

CheckBoxesForm.defaultProps = {
  submitButton: 'Apply',
  items: [],
  itemsSelected: []
};

CheckBoxesForm.propTypes = {
  submitButton: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  items: PropTypes.arrayOf(PropTypes.object),
  itemsSelected: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default CheckBoxesForm;
