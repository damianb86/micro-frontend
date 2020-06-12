import React from "react";
import { shallow } from "enzyme";

import ProgressCircle from "./index";
import progressCircleData from "../../../../__test__/fixtures/common/ProgressCircle";

describe("<ProgressCircle />", () => {
  const { percent, color } = progressCircleData;
  const wrapper = shallow(<ProgressCircle percent={percent} color={color} />);

  it("should render <ProgressCircle />", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should render a progress circle chart", () => {
    expect(wrapper.find("C3Chart")).toHaveLength(1);
  });
});
