import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ControllSwitchHoc } from "wowjoy-component/es/tools";

const IconAdd = styled.span`
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #1dc4a6;
  margin-right: 12px;
  &::before,
  &::after {
    content: "";
    display: block;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &::before {
    width: 8px;
    height: 2px;
  }
  &::after {
    width: 2px;
    height: 8px;
  }
`;
const IconDel = styled.span`
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #f88686;
  &::before {
    content: "";
    display: block;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 2px;
  }
`;
const Adder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #999;
  height: 36px;
`;
const Deleter = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8e8;
`;
class InputAdder extends PureComponent {
  render() {
    const { min, max, values = [], component: Component } = this.props;
    return (
      <div>
        {values.map((ele, index) => (
          <Deleter key={index}>
            <Component onChange={this.onChange(index)} value={ele} />
            {values.length === min || <IconDel onClick={this.onDel(index)} />}
          </Deleter>
        ))}
        {values.length === max || (
          <Adder onClick={this.onAdd}>
            <IconAdd />
            新增一条
          </Adder>
        )}
      </div>
    );
  }

  onAdd = () => {
    const { values = [], onChange } = this.props;
    onChange && onChange([...values, undefined]);
  };
  onDel = index => () => {
    const { values, onChange } = this.props;
    onChange && onChange(values.filter((ele, i) => i !== index));
  };
  onChange = index => value => {
    const { values, onChange } = this.props;
    values[index] = value;
    onChange && onChange([...values]);
  };
}
InputAdder.proptypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  values: PropTypes.array,
  onChange: PropTypes.func,
  component: PropTypes.func.isRequired
};
export default ControllSwitchHoc({ value: "values" })(InputAdder);
