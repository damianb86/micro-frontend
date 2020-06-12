import { DragSource, DropTarget } from 'react-dnd';

import ListViewRow from './ListViewRow';

const cellSource = {
  beginDrag(props) {
    return { recordId: props.row.id, relativeRank: props.row.relativeRank };
  },

  canDrag(props) {
    return !!props.enableDnD;
  }
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

const cellTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    props.handleDrop(item.recordId, props.row.id);
  },

  canDrop(props, monitor) {
    const item = monitor.getItem();
    return item.recordId !== props.row.id;
  }
};

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    item: monitor.getItem()
  };
}

// Connecting drop target and source target
const dropTarget = DropTarget('ListViewRow', cellTarget, dropCollect)(ListViewRow);

const SortableListViewRow = DragSource('ListViewRow', cellSource, dragCollect)(dropTarget);
export default SortableListViewRow;
