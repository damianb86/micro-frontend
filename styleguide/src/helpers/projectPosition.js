/* eslint-disable import/prefer-default-export */
import { defaultMemoize } from 'reselect';

export const getFormattedCurrency = (currency, wage) => {
  if (currency && wage) {
    return wage.split(' - ')
      .map(value => currency.symbol + new Intl.NumberFormat().format(value))
      .join(' - ');
  }
  return wage || '-';
};

export const getFormattedEquity = (equityType, equity, currency) => {
  if (equity) {
    const equityArray = equity.trim().split(' - ');

    switch (equityType) {
      case 'cash':
        return equityArray.map(value => `${(value && currency) ? currency.symbol : ''}${new Intl.NumberFormat().format(Math.round(value))}`).join(' - ');
      case 'shares':
        return `${equityArray.map(x => Math.round(x)).join(' - ')} ${'Shares'}`;
      case 'percent':
        return equityArray.map(value => `${value} ${value ? '%' : ''}`).join(' - ');
      default:
        return equity;
    }
  }
  return '-';
};
