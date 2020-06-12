import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

import DropdownButton, { DropdownContentButtons } from '../DropdownButton';
import CollapsibleFilterContainer from '../CollapsibleFilterContainer';
import useToggle from '../../../hooks/useToggle';
import useDateRangePresets from '../../../hooks/useDateRangePresets';
import TimeFrameSelector from '../TimeFrameSelector';
import { isSameDate } from '../../../helpers/time';
import { Desktop, Mobile } from '../Responsive';
import './index.scss';

const TimeFrameDropdown = ({
  id,
  placeholder,
  startDate,
  endDate,
  pullRight,
  onApply,
  onCancel,
  onDatesChange,
  prevPreset,
  timeFrameDirection,
  isMobileResponsive,
  ...timeFrameProps
}) => {
  const [isOpen, setOpen, setClose, handleToggle] = useToggle(false);
  const [
    { selectedStartDate, selectedEndDate },
    title,
    presetSelected,
    setDates,
    setTitle,
    setPresetSelected
  ] = useDateRangePresets(startDate, endDate, placeholder, prevPreset);
  const baseClass = 'time-frame-dropdown';

  const handleApply = () => {
    setTitle(presetSelected, selectedStartDate, selectedEndDate);

    onApply({ startDate: selectedStartDate, endDate: selectedEndDate, presetSelected });
    setClose();
  };

  const handleCancel = () => {
    onCancel();
    setClose();
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    setDates({ startDate, endDate });
    onDatesChange({ startDate, endDate });
  };

  const handlePresetSelect = selectedPreset => setPresetSelected(selectedPreset);

  return (
    <Fragment>
      <Desktop isVisible={!isMobileResponsive}>
        <DropdownButton
          id={id}
          title={title}
          open={isOpen}
          onOpen={setOpen}
          onClose={setClose}
          onClickOutside={setClose}
          className={baseClass}
        >
          <DropdownContentButtons
            onApply={handleApply}
            onCancel={handleCancel}
            pullRight={pullRight}
            disabled={isSameDate(selectedStartDate, startDate) && isSameDate(selectedEndDate, endDate)}
          >
            <TimeFrameSelector
              className={`${baseClass}__datepicker`}
              startDate={selectedStartDate}
              endDate={selectedEndDate}
              onDatesChange={handleDatesChange}
              onPresetSelect={handlePresetSelect}
              prevPreset={presetSelected}
              direction={timeFrameDirection}
              {...timeFrameProps}
            />
          </DropdownContentButtons>
        </DropdownButton>
      </Desktop>
      <Mobile isHidden={!isMobileResponsive}>
        <CollapsibleFilterContainer
          className={`${baseClass}__mobile`}
          isOpen={isOpen}
          title={title}
          onToggle={handleToggle}
        >
          <TimeFrameSelector
            className={`${baseClass}__mobile__datepicker`}
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            onDatesChange={handleDatesChange}
            onPresetSelect={handlePresetSelect}
            prevPreset={presetSelected}
            direction="left"
            numberOfMonths={1}
            {...timeFrameProps}
          />
        </CollapsibleFilterContainer>
      </Mobile>
    </Fragment>
  );
};


TimeFrameDropdown.defaultProps = {
  restrictToFutureDates: false,
  restrictToPastDates: false,
  isOutsideRange: () => false,
  onCancel: () => null,
  onDatesChange: () => null,
  timeFrameDirection: 'right',
  isMobileResponsive: false
};

TimeFrameDropdown.propTypes = {
  id: PropTypes.string,
  startDate: PropTypes.instanceOf(Moment),
  endDate: PropTypes.instanceOf(Moment),
  dropdownVisible: PropTypes.bool,
  restrictToFutureDates: PropTypes.bool,
  restrictToPastDates: PropTypes.bool,
  pullRight: PropTypes.bool,
  focusedInput: PropTypes.string,
  hideDropdown: PropTypes.func,
  onSubmit: PropTypes.func,
  onFocusChange: PropTypes.func,
  isOutsideRange: PropTypes.func,
  onCancel: PropTypes.func,
  onDatesChange: PropTypes.func,
  presets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    startDate: PropTypes.object,
    endDate: PropTypes.object
  })),
  prevPreset: PropTypes.string,
  timeFrameDirection: PropTypes.oneOf(['left', 'right']),
  isMobileResponsive: PropTypes.bool
};

export default TimeFrameDropdown;
