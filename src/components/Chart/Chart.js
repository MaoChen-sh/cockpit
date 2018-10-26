import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import echarts from "echarts/lib/echarts";

require("echarts/lib/component/dataset");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
const Wrap = styled.div`
  display: inline-block;
  height: 200px;
  width: 100%;
  ${p => p.defaultStyles};
`;

class Chart extends PureComponent {
  componentDidMount() {
    this.draw();
  }
  componentDidUpdate() {
    this.draw();
  }
  draw = () => {
    const { options } = this.props;
    if (!options) {
      return;
    }
    const chart = echarts.init(this.chart);
    chart.setOption({
      ...options,
      series: options.series.map(ele => ({
        ...ele,
        ...{
          hoverAnimation: false,
          selectedOffset: 0
        }
      }))
    });
  };
  render() {
    const { defaultStyles, className } = this.props;
    return (
      <Wrap
        defaultStyles={defaultStyles}
        className={className}
        innerRef={el => (this.chart = el)}
      />
    );
  }
}

Chart.propTypes = {
  options: PropTypes.object
};

export default Chart;
