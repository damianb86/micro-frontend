import { useState } from 'react';

import { dateRange } from '../../helpers/time';

const useDateRangeTitle = (startDate, endDate, placeholder) => {
  const [title, setTitle] = useState(startDate || endDate ? dateRange(startDate, endDate) : placeholder);

  const handleSetTitle = (presetSelected, selectedStartDate, selectedEndDate) => {
    if (!presetSelected || presetSelected === 'Custom') {
      setTitle(dateRange(selectedStartDate, selectedEndDate));
    } else {
      setTitle(presetSelected);
    }
  };

  return [title, handleSetTitle];
};

export default useDateRangeTitle;
