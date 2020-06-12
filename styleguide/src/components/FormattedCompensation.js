import React from 'react';
import PropTypes from 'prop-types';

function compensationType(type) {
  switch (type) {
    case 'shares':
      return 'shares';
    default:
      return '%';
  }
}

const FormattedCompensation = ({ compensation, currency, className, noDescription }) => {
  if (!compensation) {
    return null;
  }

  let salary = [];
  const currencySymbol = (currency && currency.symbol) || '';

  if (compensation.salary) {
    salary.push(`Salary: ${currencySymbol}${compensation.salary}`);
  }

  if (compensation.bonus) {
    if (compensation.bonusType === 'cash' || compensation.bonus_type === 'cash') {
      salary.push(`Bonus: ${currencySymbol}${compensation.bonus}`);
    } else {
      let type = compensationType(compensation.bonusType || compensation.bonus_type);
      salary.push(`Bonus: ${compensation.bonus} ${type}`);
    }
  }

  if (compensation.equity) {
    if (compensation.equityType === 'cash' || compensation.equity_type === 'cash') {
      salary.push(`Equity: ${currencySymbol}${compensation.equity}`);
    } else {
      let type = compensationType(compensation.equityType || compensation.equity_type);
      salary.push(`Equity: ${compensation.equity} ${type}`);
    }
  }
  salary = salary.join(' + ');

  let arr;
  if (noDescription) {
    arr = [salary, compensation.dates];
  } else {
    arr = [salary, compensation.description, compensation.dates];
  }

  return (
    <span className={className}>{arr.filter(c => c).reduce((prev, curr, i) => [prev, <br key={i} />, curr])}</span>
  );
};

FormattedCompensation.defaultProps = {
  noDescription: false
};

FormattedCompensation.propTypes = {
  className: PropTypes.string,
  compensation: PropTypes.object,
  currency: PropTypes.object,
  noDescription: PropTypes.bool
};

export default FormattedCompensation;
