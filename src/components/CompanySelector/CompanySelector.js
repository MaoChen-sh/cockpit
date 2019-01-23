import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ControllSwitchHoc } from "wowjoy-component/es/tools";
import { ReactComponent as Selected } from "static/svg/check.svg";
const Wrap = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const Title = styled.div`
  height: 40px;
  color: #fff;
  background: linear-gradient(-244deg, #0b7fe6 0%, #1ab6f4 98%);
  display: flex;
  align-items: center;
  font-size: 14px;
  span {
    padding: 0 10px;
  }
  h4 {
    text-align: center;
    flex-grow: 1;
    font-size: 16px;
  }
`;
const List = styled.ul`
  background: #fff;
  max-height: 60vh;
  overflow-y: auto;
`;
const Item = styled.li`
  height: 40px;
  border-bottom: 1px dotted #d3d3d3;
  position: relative;
  font-size: 14px;
  color: ${p => (p.isActive ? "#2998fa" : "#333")};
  line-height: 40px;
  padding-left: 10px;
  & > svg {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    path {
      fill: #2998fa;
    }
  }
`;
class CompanySelector extends PureComponent {
  onWrapClick = e => {
    if (e.target === this.wrapNode) {
      const { onCancel } = this.props;
      onCancel && onCancel();
    }
  };
  handleChange = id => e => {
    const { onChange } = this.props;
    onChange && onChange(id, e);
  };
  render() {
    const { value, list = [], title } = this.props;

    return (
      <Wrap ref={el => (this.wrapNode = el)} onClick={this.onWrapClick}>
        <Title>
          <h4>{title}</h4>
        </Title>
        <List>
          {list.map(ele => (
            <Item
              onClick={this.handleChange(ele.id)}
              key={ele.id}
              isActive={value === ele.id}
            >
              {ele.content}
              {value === ele.id && <Selected />}
            </Item>
          ))}
        </List>
      </Wrap>
    );
  }
}

CompanySelector.propTypes = {
  value: PropTypes.string,
  list: PropTypes.array,
  title: PropTypes.node,
  onChange: PropTypes.func
};

export default ControllSwitchHoc({})(CompanySelector);
