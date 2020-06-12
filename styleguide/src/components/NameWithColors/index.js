import React from 'react';
import { string, arrayOf, shape, object, number, oneOfType } from 'prop-types';
import classNames from 'classnames';

import { COLOR_CATEGORIES } from '../../../constants/common';
import './index.scss';

const NameWithColors = ({ name, colors, colorCategories, className }) => (
  <div className={classNames('name-with-colors', className)}>
    <span className="name">{name}</span>
    <span className="colors">
      {colors.map(({ color, key }) => (
        <span
          key={key}
          className="name-with-colors__badge"
          style={{ backgroundColor: colorCategories ? colorCategories[color || '0'] : COLOR_CATEGORIES[color || '0'] }}
        />
      ))}
    </span>
  </div>
);

NameWithColors.defaultProps = { colors: [] };

NameWithColors.propTypes = {
  name: oneOfType([string, object]),
  colors: arrayOf(shape({
    key: oneOfType([string, number]).isRequired,
    color: oneOfType([string, number])
  })),
  colorCategories: object
};

export default NameWithColors;
