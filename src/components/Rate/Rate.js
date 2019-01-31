import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const STATUS = {
  UP: "up",
  DOWN: "down",
  EQUALLY: "equally"
};
const colors = {
  [STATUS.UP]: "#27b624",
  [STATUS.DOWN]: "#EB272E",
  [STATUS.EQUALLY]: "#999"
};

const Wrap = styled.div`
  font-size: 12px;
  line-height: 1;
  padding-left: 18px;
  display: inline-block;
  position: relative;
  color: ${p => colors[p.status]};
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 6px solid ${p => colors[p.status]};
    transform: ${p => p.status === STATUS.DOWN && "rotate(180deg)"};
    ${p =>
      p.status === STATUS.EQUALLY &&
      `
      border-left:0;
      border-right:0;
      width: 8px;
      border-bottom-width: 2px  
    `};
  }
`;

class Rate extends PureComponent {
  get value() {
    const { value = 0 } = this.props;
    return `${(value * 100).toFixed(1)}%`;
  }
  get status() {
    const { value = 0 } = this.props;
    if (value > 0) {
      return STATUS.UP;
    }
    if (value < 0) {
      return STATUS.DOWN;
    }
    return STATUS.EQUALLY;
  }

  render() {
    const { className, defaultStyles, value } = this.props;
    if (value === undefined) {
      return null;
    }
    return (
      <Wrap
        className={className}
        defaultStyles={defaultStyles}
        status={this.status}
      >
        {this.value}
      </Wrap>
    );
  }
}

Rate.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Rate;
