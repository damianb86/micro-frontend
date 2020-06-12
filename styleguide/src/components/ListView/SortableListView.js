import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import ListView from './index';

const SortableListView = SortableContainer(props => <ListView {...props} sortable />);

export default SortableListView;
