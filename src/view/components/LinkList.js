import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RightArrow } from "components";
import { withRouter } from "react-router-dom";

const Wrap = styled.div`
  width: calc(92vw + 10px);
  margin: 0 auto;

  ${p => p.defaultStyles}
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 46vw;
  height: 120px;
  float: left;
  margin-right: 10px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  &:nth-child(2n) {
    margin-right: 0;
  }
  & > svg {
    width: 32px;
    height: 32px;
  }
  & > p {
    font-size: 12px;
    color: #6b6b6b;
    margin: 10px auto;
  }
  & > span {
    display: flex;
    align-items: center;
    line-height: 14px;
    font-weight: bold;
    i {
      margin-left: 6px;
    }
  }
`;
class LinkList extends PureComponent {
  linkTo = to => () => {
    if (to) {
      this.props.history.push(to);
    }
  };
  render() {
    const { list, className, defaultStyles } = this.props;
    return (
      <Wrap className={className} defaultStyles={defaultStyles}>
        {list.map((ele, index) => {
          const { to = "", svg: Svg, content, value } = ele;
          return (
            <Item onClick={this.linkTo(to)} key={index}>
              <Svg />
              <p>{content}</p>
              <span>
                {value}
                {to && <RightArrow />}
              </span>
            </Item>
          );
        })}
      </Wrap>
    );
  }
}

LinkList.propTypes = {
  list: PropTypes.array
};

export default withRouter(LinkList);