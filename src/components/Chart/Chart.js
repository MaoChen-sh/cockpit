import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import echarts from "echarts/lib/echarts";
import "zrender/lib/svg/svg";
require("echarts/lib/component/dataset");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/effectScatter");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/chart/map");
require("echarts/lib/component/geo");
require("echarts/lib/component/visualMap");

const Wrap = styled.div`
  display: inline-block;
  height: 200px;
  width: 100%;
  ${p => p.defaultStyles};
`;

class Chart extends Component {
  componentDidMount() {
    this.draw();
  }
  shouldComponentUpdate(nextProps) {
    const { data } = this.props;
    const { data: nextData } = nextProps;
    if (JSON.stringify(data) !== JSON.stringify(nextData)) {
      return true;
    }
    for (const key in this.props) {
      if (this.props.hasOwnProperty(key) && key !== "data") {
        if (this.props[key] !== nextProps[key]) {
          return true;
        }
      }
    }

    return false;
  }
  componentDidUpdate() {
    this.draw();
  }
  draw = () => {
    const { getOptions, data, svg } = this.props;
    if (!getOptions) {
      return;
    }
    const chart = echarts.init(this.chart, null, {
      renderer: svg ? "svg" : "canvas"
    });
    const options = getOptions(data);
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
        ref={el => (this.chart = el)}
      />
    );
  }
}

Chart.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  getOptions: PropTypes.func,
  data: PropTypes.array
};

export default Chart;
