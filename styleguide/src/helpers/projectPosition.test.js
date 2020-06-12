import { getFormattedCurrency, getFormattedEquity } from './projectPosition';

const currency = { code: 'USD', id: '2', name: 'Dollar', symbol: '$' };

describe('getFormattedCurrency', () => {
  it('should return formatted currency', () => {
    const result = getFormattedCurrency(currency, '1000 - 2000');
    expect(result).toEqual('$1,000 - $2,000');
  });

  it('should return dash when null or undefined value is passed', () => {
    const result = getFormattedCurrency(null, null);
    expect(result).toEqual('-');
  });
});

describe('getFormattedEquity', () => {
  it('should return formatted equity rounded of if shares', () => {
    const result = getFormattedEquity('shares', '1.0 - 2.6');
    expect(result).toEqual('1 - 3 Shares');
  });

  it('should return formatted equity not rounded of if percentage with % symbol', () => {
    const result = getFormattedEquity('percent', '1.0 - 2.6');
    expect(result).toEqual('1.0 % - 2.6 %');
  });

  it('should return formatted equity rounded of if cash with currency symbols', () => {
    const result = getFormattedEquity('cash', '12345.0 - 2.6', currency);
    expect(result).toEqual('$12,345 - $3');
  });

  it('should return dash when null or undefined value is passed', () => {
    const result = getFormattedEquity(null, null);
    expect(result).toEqual('-');
  });
});
