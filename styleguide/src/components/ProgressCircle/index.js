import React from "react";
import PropTypes from "prop-types";
import C3Chart from "react-c3js";
import "c3/c3.css";

import "./index.scss";
import { hexColor } from "../../../propTypes";

const ProgressCircle = ({ percent, color }) => {
  return (
    <div className="progress-circle">
      <C3Chart
        data={{
          columns: [["data", percent]],
          type: "gauge"
        }}
        gauge={{
          label: {
            show: false,
            format: (value, ratio) => {
              return `${parseInt(value, 10)}%`;
            }
          },
          width: 14, // adjusts arc thickness
          fullCircle: true,
          startingAngle: Math.PI * 2
        }}
        size={{ height: 190 }}
        color={{ pattern: [color] }}
        tooltip={{ show: false }}
        legend={{ show: false }}
      />
    </div>
  );
};

ProgressCircle.defaultProps = {
  color: "#50d087"
};

ProgressCircle.propTypes = {
  percent: PropTypes.number.isRequired,
  color: hexColor
};

export default ProgressCircle;
