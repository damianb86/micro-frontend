import React, { useState } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

import ActiveForm from '../ActiveForm';
import { getFilterItemCount } from '../../../helpers/stringHelpers';
import { getInitialSelectedItems } from './helpers';
import { elementTypePropTypeChecker } from '../../../propTypes';
import './index.scss';

const FiltersContainer = ({ filters, onSubmit }) => {
  const [itemsSelected, setItemsSelected] = useState(getInitialSelectedItems(filters));
  const [openFilterId, setOpenFilterId] = useState(null);

  const handleOpen = id => setOpenFilterId(id);
  const handleClose = () => setOpenFilterId(null);
  const handleSubmit = () => onSubmit(itemsSelected);
  const handleApply = items => setItemsSelected({ ...itemsSelected, [openFilterId]: items });

  return (
    <ActiveForm
      submitButton={!openFilterId ? 'Search' : null}
      onSubmit={!openFilterId ? handleSubmit : null}
      className="filters-container"
      isCancelVisibleOnMobile
    >
      <div>
        {filters.map(({ Component, id, title, initialSelectedItems, props }) => (
          <div className={className('filters-container__filter', { 'open-filter': openFilterId, selected: openFilterId === id })} key={id}>
            <Component
              isMobileResponsive
              id={id}
              onOpen={handleOpen}
              onClose={handleClose}
              onApply={handleApply}
              title={getFilterItemCount(title, itemsSelected[id] || initialSelectedItems)}
              {...props}
            />
          </div>
        ))}
      </div>
    </ActiveForm>
  );
};

FiltersContainer.defaultProps = {
  filters: [],
  onSubmit: () => null
};

FiltersContainer.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    Component: elementTypePropTypeChecker,
    props: PropTypes.object
  })),
  onSubmit: PropTypes.func
};

export default FiltersContainer;
