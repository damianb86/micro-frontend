import { useState } from 'react';

import useDateRangeTitle from '../useDateRangeTitle';

const useDataRangePresets = (startDate, endDate, placeholder, prevPreset) => {
  const [{ selectedStartDate, selectedEndDate }, setDates] = useState({ selectedStartDate: undefined, selectedEndDate: undefined });
  const [title, setTitle] = useDateRangeTitle(startDate, endDate, placeholder);
  const [presetSelected, setPresetSelected] = useState(prevPreset);

  const handleSetDate = ({ startDate, endDate }) => {
    if (startDate === endDate) {
      setDates({ selectedStartDate: startDate, selectedEndDate: endDate });
    } else {
      setDates({ selectedStartDate: startDate || selectedStartDate, selectedEndDate: endDate || selectedEndDate });
    }
  };

  return [{ selectedStartDate, selectedEndDate }, title, presetSelected, handleSetDate, setTitle, setPresetSelected];
};

export default useDataRangePresets;
