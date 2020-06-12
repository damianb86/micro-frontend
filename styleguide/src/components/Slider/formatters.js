export const formatters = {
  default: val => val,
  currency: (val) => {
    if (val >= 1000000) {
      return `${Math.round(val / 10000) / 100}Mil`;
    }
    if (val > 1000) {
      return `${val / 1000}k`;
    }

    return val;
  },
  percent: val => `${val}%`
};

export default formatters;
