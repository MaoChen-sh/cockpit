import React, { PureComponent } from "react";
import { BlockArea as BlockAreaBase, RightArrow } from "components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { selectedItem } from "context";

const BlockArea = styled(BlockAreaBase)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #666666;
  font-weight: bold;
  & > i {
    &::after {
      border-color: #999;
    }
  }
`;
class Statistics extends PureComponent {
  static contextType = selectedItem;

  componentDidMount() {
    this.context.clear()
  }
  
  render() {
    return (
      <div>
        {[
          { content: "同一项目不同时间对比", to: '/oneproject' },
          { content: "同一时间不同项目对比", to: '/onedate' }
        ].map((ele, index) => (
          <Link to={"/statistics/itemselect" + ele.to} key={index}>
            <BlockArea>
              {ele.content}
              <RightArrow shadow={false} />
            </BlockArea>
          </Link>
        ))}
      </div>
    );
  }
}

export default Statistics;
