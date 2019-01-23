import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RightArrow, Rate } from "components";
import { withRouter } from "react-router-dom";
const Wrap = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  margin: 18px 0;
  justify-content: flex-start;
  padding-left: 12px;
  flex-shrink: 0;
  flex-grow: 0;
  &:nth-child(even) {
    padding-left: calc(5vw + 12px);
  }
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
    margin-right: 14px;
  }
`;
const TextContent = styled.div`
  width: 60px;
  & > h3 {
    font-size: 12px;
    color: #6b6b6b;
  }
  & > *:nth-child(n + 2) {
    margin-top: 10px;
  }
  & > p {
    font-size: 16px;
    color: #333333;
    height: 20px;
    line-height: 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    & > span {
      margin-right: 10px;
    }
    & > i {
      flex-shrink: 0;
    }
  }
`;

class NavItem extends PureComponent {
  clickHandle = () => {
    const { history, to } = this.props;
    if (to) {
      history.push(to);
    }
  };
  render() {
    const { svg: Svg, title, count, rate, noLink } = this.props;
    return (
      <Wrap onClick={this.clickHandle}>
        <Svg />
        <TextContent>
          <h3>{title}</h3>
          {rate && <Rate value={rate} />}
          <p>
            <span>{count}</span>
            {noLink || <RightArrow />}
          </p>
        </TextContent>
      </Wrap>
    );
  }
}

NavItem.propTypes = {
  svg:  PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({render: PropTypes.func.isRequired}),
  ]),
  title: PropTypes.string,
  count: PropTypes.number,
  rate: PropTypes.number,
  noLink: PropTypes.bool
};

export default withRouter(NavItem);
