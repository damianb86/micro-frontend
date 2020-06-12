import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import DateRangePickerView from '../DateRangePickerView';
import { PRESETS } from '../../../constants/timeFrames';
import SelectOptions from '../SelectOptions';
import './index.scss';

const TimeFrameSelector = ({
  restrictToFutureDates,
  restrictToPastDates,
  startDate,
  endDate,
  isOutsideRange,
  focusedInput,
  onDatesChange,
  onFocusChange,
  onPresetSelect,
  presets: newPresets,
  className,
  prevPreset,
  showTitle,
  direction,
  ...props
}) => {
  const [presets, setPresets] = useState(newPresets || PRESETS);
  const [presetSelected, setPresetSelected] = useState(prevPreset || 'Custom');

  useEffect(() => {
    if (restrictToFutureDates) {
      setPresets(
        presets.filter(preset => preset.endDate && preset.endDate.isAfter(Moment())).map(preset => ({
          ...preset,
          startDate: preset.startDate.isBefore(Moment()) ? Moment() : preset.startDate
        }))
      );
    }

    if (restrictToPastDates) {
      setPresets(
        presets.filter(preset => !preset.startDate || preset.startDate.isBefore(Moment())).map(preset => ({
          ...preset,
          endDate: preset.endDate && preset.endDate.isAfter(Moment()) ? Moment() : preset.endDate
        }))
      );
    }
  }, [restrictToFutureDates, restrictToPastDates]);

  const handleSelectPreset = (selected) => {
    const { startDate, endDate, value: presetSelected } = presets.find(preset => preset.id === selected);
    onDatesChange({ startDate, endDate });
    setPresetSelected(presetSelected);
    onPresetSelect(presetSelected);
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    onDatesChange({ startDate, endDate });
    setPresetSelected('Custom');
    onPresetSelect('Custom');
  };

  return (
    <div className={`time-frame-selector ${className}`}>
      {showTitle && <span className="time-frame-selector__title">Select Time Frame</span>}
      <div className="time-frame-selector__presets">
        <div className="time-frame-selector__presets__label">
          <span>Date Range</span>
        </div>
        <SelectOptions
          id="timeframePresetsSelector"
          options={presets}
          onSelect={handleSelectPreset}
          prompt={presetSelected}
        />
      </div>
      <div className="time-frame-selector__date-picker-wrapper">
        <div className="time-frame-selector__date-picker-wrapper__label">
          <span className="time-frame-selector__date-picker-wrapper__label__start">Starting</span>
          <span className="time-frame_selector__date-picker-wrapper__label__end">Ending</span>
        </div>
        <DateRangePickerView
          startDateId="timeFrameSelectorStartDate"
          endDateId="timeFrameSelectorEndDate"
          noBorder
          startDate={startDate}
          endDate={endDate}
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={onFocusChange}
          restrictToFutureDates={restrictToFutureDates}
          restrictToPastDates={restrictToPastDates}
          isOutsideRange={isOutsideRange}
          direction={direction}
          {...props}
        />
      </div>
    </div>
  );
};

export default TimeFrameSelector;

TimeFrameSelector.defaultProps = {
  restrictToFutureDates: false,
  restrictToPastDates: false,
  isOutsideRange: () => false,
  className: '',
  showTitle: false,
  direction: 'right'
};

TimeFrameSelector.propTypes = {
  startDate: PropTypes.instanceOf(Moment),
  endDate: PropTypes.instanceOf(Moment),
  restrictToFutureDates: PropTypes.bool,
  restrictToPastDates: PropTypes.bool,
  onFocusChange: PropTypes.func,
  onDatesChange: PropTypes.func,
  onPresetSelect: PropTypes.func,
  isOutsideRange: PropTypes.func,
  className: PropTypes.string,
  presets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    startDate: PropTypes.object,
    endDate: PropTypes.object
  })),
  prevPreset: PropTypes.string,
  showTitle: PropTypes.bool,
  direction: PropTypes.oneOf(['left', 'right'])
};
