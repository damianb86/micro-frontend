/* eslint-disable import/prefer-default-export */
import React from 'react';
import reduce from 'lodash/reduce';
import isEmpty from 'lodash/isEmpty';
import { renderToStaticMarkup } from 'react-dom/server';
import ChartTooltip from '../components/common/ChartTooltip';
import PROJECT_GROUPS from '../constants/project';

/**
 * placementRateExists
 * returns true if the closed project count is greater than 0, and false otherwise
 * @param {*} placementRate
 */
export function placementRateExists(data) {
  return reduce(data, (acc, { count }) => acc + count, 0) > 0;
}

/**
 * daysToPlacementExists
 * returns true if the Firm's days to placement is greater than 0, and false otherwise
 * @param {*} daysToPlacement
 */
export function daysToPlacementExists(data) {
  if (isEmpty(data)) {
    return false;
  }

  return data.some(item => item.name === 'Firm' && item.average > 0);
}

export const getTooltipObject = (values, toolTipLabel, fixed = false) => ({
  show: true,
  contents: (data) => {
    const [{ id, index }] = data;
    const { title, count, color, value } = values[index];

    // The c3 tooltip.contents function expects an HTML string to be returned
    // So we render our React tooltip component using renderToStaticMarkup on it.
    // https://github.com/bcbcarl/react-c3js/pull/36/files#diff-1fdf421c05c1140f6d71444ea2b27638R93
    return renderToStaticMarkup(
      <ChartTooltip
        key={id}
        title={typeof title === 'function' ? title(data) : title}
        count={typeof count === 'function' ? count(data) : count}
        value={typeof value === 'function' ? value(data) : value}
        color={typeof color === 'function' ? color(data) : color}
        label={toolTipLabel}
      />
    );
  },
  position: fixed ? (data, width, height, element) => ({ top: element.getAttribute('y'), left: 70 }) : undefined
});

export const stringLengthLimit = (string, maxlength) =>
  (string.length > maxlength ? `${string.substring(0, maxlength - 3)}...` : string);

export const vectorToDiagonalMatrix = (vector) => {
  if (!vector || !Array.isArray(vector)) {
    return [];
  }

  return vector.map((item, index) => [...Array(index).fill(0), item, ...Array(vector.length - index - 1).fill(0)]);
};

/**
 * getProjectSummaryGroupedByCategory
 * adds the values and percents of same category types and returns them as a single group
 * @param {*} summaries
 */

const STATUS_CATEGORY_LIST = ['in', 'research', 'out', 'other'];

export const getProjectSummaryGroupedByCategory = (summaries = []) =>
  STATUS_CATEGORY_LIST.map((group, index) => {
    const projectGroupSummary = { ...PROJECT_GROUPS[group], id: index, count: 0, percent: 0 };
    summaries.forEach((grpsum) => {
      if (grpsum.group === group) {
        projectGroupSummary.count += grpsum.value;
        projectGroupSummary.percent += grpsum.percent;
      }
    });

    return projectGroupSummary;
  });
