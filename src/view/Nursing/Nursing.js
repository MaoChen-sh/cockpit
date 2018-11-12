import React, { PureComponent } from "react";
import { LinePointer, RightArrow, BlockArea } from "components";
import { Link } from "react-router-dom";
import styled from "styled-components";
import normsData from "./Norms/normsData";
const Item = styled(BlockArea)`
  background: #ffffff;
  margin: 0 auto 10px;
  position: relative;
  h2 {
    font-size: 14px;
    text-align: left;
    color: #0d86e8;
    letter-spacing: -0.34px;
  }

  p {
    margin-top: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    color: #999999;
    letter-spacing: -0.29px;
  }
  i {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
  }
`;
const staticData = Object.entries(normsData).map((ele, index) => {
  const [key, value] = ele;
  return {
    ...value,
    to: value.children
      ? `nursing/${key}/${Object.keys(value.children)[0]}`
      : `nursing/${key}`
  };
});
class Nursing extends PureComponent {
  render() {
    return (
      <div>
        <LinePointer>每月2号凌晨4点更新上月的数据</LinePointer>
        {staticData.map((ele, index) => {
          return (
            <Link key={index} to={ele.to}>
              <Item title={ele.title}>
                <p>{ele.description}</p>
                <RightArrow />
              </Item>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Nursing;
