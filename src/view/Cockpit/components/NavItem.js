import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RightArrow } from "components";
const Wrap = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
  margin: 18px 0;
  &:first-child {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 1px;
      background: linear-gradient(
          to bottom,
          #c6c6c6 0%,
          #c6c6c6 50%,
          transparent 50%
        )
        center/1px 5px repeat-y;
    }
  }
  & > svg {
    width: 32px;
    height: 32px;
    margin-right: 20px;
  }
`;
const TextContent = styled.div`
  &>h3 {
    font-size: 12px;
    color: #6b6b6b;
  }
  &>p{
    margin-top: 10px
    font-size: 16px;
    color: #333333;
    height: 20px;
    line-height: 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    &>span{
      margin-right: 10px;
    }
  }
`;

class NavItem extends PureComponent {
  render() {
    const { svg: Svg, title, count } = this.props;
    return (
      <Wrap>
        <Svg />
        <TextContent>
          <h3>{title}</h3>
          <p>
            <span>{count}</span>
            <RightArrow />
          </p>
        </TextContent>
      </Wrap>
    );
  }
}

NavItem.propTypes = {
  svg: PropTypes.node,
  title: PropTypes.string,
  count: PropTypes.number
};

export default NavItem;
