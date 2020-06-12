import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import StackedListItem from './StackedListItem';
import { ListItemPropType } from './propTypes';

const StackedListWithThreads = ({
  className,
  items,
  isReply,
  ...props
}) =>
  (
    <ul className={`stacked-list-with-threads ${className} ${isReply ? 'reply' : ''}`}>
      {items.map(item => (
        <StackedListItem
          key={item.id}
          isReply={isReply}
          item={item}
          {...props}
        />
      ))}
    </ul>
  );

StackedListWithThreads.defaultProps = {
  className: '',
  menuOptions: [],
  onMenuSelect: () => null,
  setAddButtonVisibility: () => null,
  isReply: false,
  parentsVisibilityContext: false,
  projectType: {}
};

StackedListWithThreads.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape(ListItemPropType)),
  menuOptions: PropTypes.array,
  onMenuSelect: PropTypes.func,
  isReply: PropTypes.bool,
  pinnedItemId: PropTypes.string,
  showRepliesList: PropTypes.array,
  onToggleShowReplies: PropTypes.func,
  candidacy: PropTypes.shape({ id: PropTypes.string }),
  projectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  personId: PropTypes.number,
  setAddButtonVisibility: PropTypes.func,
  projectType: PropTypes.shape({ clientInvite: PropTypes.bool }),
  parentsVisibilityContext: PropTypes.bool,
  editForm: PropTypes.func,
  replyForm: PropTypes.func
};

export default StackedListWithThreads;
