import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ControllSwitchHoc } from "wowjoy-component/es/tools";
const Wrap = styled.span`
  display: inline-block;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  position: relative;
  width: 15px;
  height: 15px;
  & > input {
    width: 0;
    height: 0;
    opacity: 0;
    visibility: hidden;
  }
  ${p =>
    p.disabled &&
    `
      border-color: #f0f0f0
     `}
  ${p =>
    p.active &&
    `
      background: #0D86E8;
      border-color: #0D86E8;
      &::after{
        content: '';
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-55%, -75%)  rotate(-45deg) skew(10deg);
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        width: 7px;
        height: 3px;
      }
  `}

  ${p =>
    p.type === "checkBox" &&
    `
      border-radius: 2px;
      &::after{
        width: 8px;
        height: 4px;
      }
  `}
  ${p => p.defaultStyles}
`;

class Radio extends PureComponent {
  clickHandle = () => {
    const { onChange, value, disabled } = this.props;
    if (disabled) return;
    onChange && onChange(!value);
  };
  get isActive() {
    const { value } = this.props;
    return value;
  }
  render() {
    const { isActive, clickHandle, props } = this;
    const {
      className,
      defaultStyles,
      name,
      disabled,
      value = false,
      type = "radio"
    } = props;
    return (
      <Wrap
        className={`${className} type ${isActive ? "active" : ""} ${
          disabled ? " disabled" : ""
        }`}
        defaultStyles={defaultStyles}
        active={isActive}
        onClick={clickHandle}
        type={type}
        disabled={disabled}
      >
        <input
          type={type}
          name={name}
          value={value}
          disabled={disabled}
          readOnly
        />
      </Wrap>
    );
  }
}

Radio.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["checkBox", "radio"])
};

export default ControllSwitchHoc()(Radio);
