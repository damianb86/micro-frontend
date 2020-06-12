import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import ListViewHeader from './ListViewHeader';

const SortableListViewHeader = SortableContainer(props => <ListViewHeader {...props} />);
export default SortableListViewHeader;
