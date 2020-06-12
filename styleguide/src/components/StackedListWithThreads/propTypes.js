/* eslint-disable import/prefer-default-export */
import { string, bool, any, number, arrayOf, shape, oneOfType } from 'prop-types';

export const ListItemBasicPropType = {
  id: oneOfType([string, number]),
  title: string,
  avatar: string,
  labels: arrayOf(string),
  pinned: bool,
  body: any
};

export const ListItemPropType = {
  ...ListItemBasicPropType,
  visible: bool,
  subtitle: string,
  tags: arrayOf(shape({
    id: oneOfType([string, number]),
    name: string,
    color: string
  })),
  attachments: arrayOf(shape({
    id: oneOfType([string, number]),
    fileFileName: string,
    downloadUrl: string
  })),
  content: string,
  categoryId: number,
  thread: arrayOf(shape(ListItemBasicPropType))
};
