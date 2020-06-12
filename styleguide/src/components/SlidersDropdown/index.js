import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Desktop, Mobile } from '../Responsive';
import useToggle from '../../../hooks/useToggle';
import DropdownButton, { DropdownContentButtons } from '../DropdownButton';
import SlidersGroup from '../SlidersGroup';
import sliderProps from '../Slider/propTypes';
import './index.scss';
import CollapsibleFilterContainer from '../CollapsibleFilterContainer';

const SlidersDropdown = ({
  id,
  title,
  sliders,
  onApply,
  onCancel,
  disabled,
  isMobileResponsive,
  className
}) => {
  const [slidersValues, setSlidersValues] = useState({});
  const [isOpen, setOpen, setClose, handleToggle] = useToggle(false);
  const baseClass = 'sliders-dropdown';

  const handleApply = () => {
    const values = Object.values(sliders).reduce((obj, slider) => {
      const sliderValues = slider.values || [slider.min || 0, slider.max || 100];

      return {
        ...obj,
        [slider.name]: slidersValues[slider.name] || sliderValues
      };
    }, {});
    onApply(values);
    setClose();
  };
  const handleCancel = () => {
    onCancel();
    setClose();
  };

  const handleChange = (val, name) => setSlidersValues({ ...slidersValues, [name]: val });

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
          disabled={disabled}
          className={className}
        >
          <DropdownContentButtons
            onApply={handleApply}
            onCancel={handleCancel}
          >
            <div className={`${baseClass}__sliders`}>
              <SlidersGroup
                sliders={sliders}
                slidersValues={slidersValues}
                onChange={handleChange}
              />
            </div>
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
          <SlidersGroup
            sliders={sliders}
            slidersValues={slidersValues}
            onChange={handleChange}
          />
        </CollapsibleFilterContainer>
      </Mobile>
    </Fragment>
  );
};

SlidersDropdown.defaultProps = {
  sliders: [],
  isMobileResponsive: false,
  onApply: () => null,
  onCancel: () => null
};

SlidersDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sliders: PropTypes.arrayOf(
    PropTypes.shape({
      ...sliderProps,
      onChange: PropTypes.func
    }),
  ),
  onApply: PropTypes.func,
  onCancel: PropTypes.func,
  disabled: PropTypes.bool,
  isMobileResponsive: PropTypes.bool
};

export default SlidersDropdown;
