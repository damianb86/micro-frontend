import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import classNames from 'classnames';

import DropdownButton, { DropdownContentButtons } from '../DropdownButton';
import TimeFrameSelector from '../TimeFrameSelector';
import CheckBox from '../CheckBox';
import SearchMultiSelectDropdown from './SearchMultiSelectDropdown';
import { Desktop, Mobile } from '../Responsive';
import CollapsibleFilterContainer from '../CollapsibleFilterContainer';

import useToggle from '../../../hooks/useToggle';
import useDateRangePresets from '../../../hooks/useDateRangePresets';
import { getEntityMappedItems } from '../../../helpers/common';
import { idNameShapePropTypes } from './../../../propTypes';
import './index.scss';

const TimeFrameCheckboxDropdown = ({
  id,
  placeholder,
  startDate,
  endDate,
  pullRight,
  onApply,
  onCancel,
  onDatesChange,
  onSelect,
  items,
  presets,
  prevPreset,
  searchMultiSelectPlaceholder,
  searchMultiSelectOptions,
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
  const [multiSelectItemIds, setMultiSelectItemIds] = useState([]);
  const [multiSelectOptions, setMultiSelectOptions] = useState(searchMultiSelectOptions);
  const baseClass = 'timeframe-checkbox-dropdown';

  useEffect(() => setMultiSelectOptions(searchMultiSelectOptions), [searchMultiSelectOptions]);

  const handleApply = () => {
    setTitle(presetSelected, selectedStartDate, selectedEndDate);

    onApply({ startDate: selectedStartDate, endDate: selectedEndDate, presetSelected, multiSelectItemIds });
    setClose();
  };

  const handleCancel = () => {
    onCancel();
    setClose();
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    setDates({ startDate, endDate });
    onDatesChange({ startDate, endDate });
    setPresetSelected('Custom');
  };

  const handlePresetSelect = selectedPreset => setPresetSelected(selectedPreset);
  const handleSelect = ({ target }) => onSelect(target.value);

  const onMultiSelectItemAdd = (itemSelected) => {
    setMultiSelectItemIds(prevValue => prevValue.concat(itemSelected.id));
    setMultiSelectOptions(prevValue => prevValue.filter(item => item.id !== itemSelected.id));
  };

  const onMultiSelectItemRemove = (itemToRemove) => {
    const newMultiSelectItemIds = multiSelectItemIds.filter(id => id !== itemToRemove);
    setMultiSelectItemIds(newMultiSelectItemIds);
    setMultiSelectOptions(searchMultiSelectOptions.filter(option => !newMultiSelectItemIds.includes(option.id)));
  };

  const isDisabled = () => ((!selectedStartDate || !selectedEndDate) && presetSelected !== 'Since Inception') || !items.some(item => item.checked);

  const multiSelectItems = (searchMultiSelectOptions && getEntityMappedItems(multiSelectItemIds, searchMultiSelectOptions)) || [];

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
            disabled={isDisabled()}
          >
            {searchMultiSelectOptions &&
              <SearchMultiSelectDropdown
                placeholder={searchMultiSelectPlaceholder}
                multiSelectOptions={multiSelectOptions}
                baseClass={baseClass}
                multiSelectItems={multiSelectItems}
                onMultiSelectItemAdd={onMultiSelectItemAdd}
                onMultiSelectItemRemove={onMultiSelectItemRemove}
              />
            }
            <TimeFrameSelector
              className={`${baseClass}__datepicker`}
              startDate={selectedStartDate}
              endDate={selectedEndDate}
              onDatesChange={handleDatesChange}
              onPresetSelect={handlePresetSelect}
              presets={presets}
              prevPreset={presetSelected}
              {...timeFrameProps}
            />
            <hr />
            <div className={`${baseClass}__select`}>
              {items.map(item => (
                <CheckBox
                  {...item}
                  key={item.value}
                  onChange={handleSelect}
                />
              ))}
            </div>
          </DropdownContentButtons>
        </DropdownButton>
      </Desktop>
      <Mobile isHidden={!isMobileResponsive}>
        <CollapsibleFilterContainer
          className={`${baseClass}__mobile`}
          isOpen={isOpen}
          title={title}
          id={id}
          onToggle={handleToggle}
        >
          {searchMultiSelectOptions &&
            <SearchMultiSelectDropdown
              placeholder={searchMultiSelectPlaceholder}
              multiSelectOptions={multiSelectOptions}
              baseClass={`${baseClass}__mobile`}
              multiSelectItems={multiSelectItems}
              onMultiSelectItemAdd={onMultiSelectItemAdd}
              onMultiSelectItemRemove={onMultiSelectItemRemove}
            />
          }
          <TimeFrameSelector
            className={`${baseClass}__mobile__datepicker`}
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            onDatesChange={handleDatesChange}
            onPresetSelect={handlePresetSelect}
            presets={presets}
            prevPreset={presetSelected}
            direction="left"
            numberOfMonths={1}
            {...timeFrameProps}
          />
          <hr />
          <div className={classNames(`${baseClass}__select`, `${baseClass}__mobile__select`)}>
            {items.map(item => (
              <CheckBox
                {...item}
                key={item.value}
                onChange={handleSelect}
              />
            ))}
          </div>
        </CollapsibleFilterContainer>
      </Mobile>
    </Fragment>
  );
};

TimeFrameCheckboxDropdown.defaultProps = {
  restrictToFutureDates: false,
  restrictToPastDates: false,
  isOutsideRange: () => false,
  onCancel: () => null,
  onDatesChange: () => null,
  onFocusChange: () => null,
  pullRight: false,
  items: [],
  timeFrameDirection: 'right',
  isMobileResponsive: false
};

TimeFrameCheckboxDropdown.propTypes = {
  id: PropTypes.string,
  startDate: PropTypes.instanceOf(Moment),
  endDate: PropTypes.instanceOf(Moment),
  restrictToFutureDates: PropTypes.bool,
  restrictToPastDates: PropTypes.bool,
  pullRight: PropTypes.bool,
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  onFocusChange: PropTypes.func,
  isOutsideRange: PropTypes.func,
  onDatesChange: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    checked: PropTypes.bool
  })),
  presets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    startDate: PropTypes.object,
    endDate: PropTypes.object
  })),
  prevPreset: PropTypes.string,
  searchMultiSelectPlaceholder: PropTypes.string,
  searchMultiSelectOptions: idNameShapePropTypes,
  timeFrameDirection: PropTypes.oneOf(['left', 'right']),
  isMobileResponsive: PropTypes.bool
};

export default TimeFrameCheckboxDropdown;
