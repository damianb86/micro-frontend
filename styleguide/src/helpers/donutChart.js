/* eslint-disable import/prefer-default-export */
export const getColumnData = (stats, legend) => legend.map((l) => {
  return [l.key].concat(stats.map((stat) => {
    const match = stat.data.find(o => o.key === l.key);
    return match ? match.value : null;
  }));
});
