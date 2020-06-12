/* eslint-disable import/prefer-default-export */
import { defaultMemoize } from 'reselect';

export const reselectRowsForMobile = defaultMemoize(rows =>
  rows.sort((a, b) => b.rank - a.rank).map(({ id, avatar, status, ...data }) => ({
    id,
    avatar,
    status,
    data
  }))
);
