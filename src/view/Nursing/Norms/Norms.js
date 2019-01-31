import React from "react";
import styled from "styled-components";
import { TableTemp as Table } from "view/components";
import normsData from "./normsData";
import { Tab as TabBase, BlockArea, Rate } from "components";
import { DateSelectPageTemplate } from "view/Template";
import { random } from "tools";

const Tab = styled(TabBase)`
  padding: 14px 3.2vw;
  li {
    width: 28.8vw;
    height: 30px;
    background: #fff;
    border-radius: 15px;
    font-size: 14px;
    color: #999999;
    &.active {
      background: #0d86e8;
      color: #fff;
    }
  }
`;

class Norms extends DateSelectPageTemplate {
  constructor(props) {
    super(props);
    const { norm } = props.match.params;
    document.title = normsData[norm].title;
  }

  get type() {
    return "month";
  }
  get childList() {
    const {
      params: { norm }
    } = this.props.match;
    return normsData[norm].children;
  }
  TabList = "";

  get listData() {
    const {
      params: { norm, childNorm }
    } = this.props.match;
    const { childList } = this;

    return (childList ? childList[childNorm] : normsData[norm]).testData.map(
      (ele, index) => ({
        ...ele,
        id: index,
        to: {
          pathname: `/nursing/normsdetail`,
          state: {
            norm: norm,
            childNorm: childNorm,
            item: ele.name
          }
        },
        value: random(0, 100, 2),
        rate: random(-1, 1, 4)
      })
    );
  }

  get content() {
    const { childList } = this;
    const { listData } = this;
    const {
      params: { norm, childNorm }
    } = this.props.match;
    return (
      <div>
        {childList && (
          <Tab
            activeId={childNorm}
            list={Object.entries(childList).map(ele => ({
              content: ele[1].title,
              id: ele[0],
              to: `/nursing/${norm}/${ele[0]}`
            }))}
          />
        )}
        <BlockArea>
          <Table
            defaultStyles={`
              th{
                white-space: nowrap;
              }
              td:first-child{
                font-size:10px;
                color: '#4a4a4a'
              }
              th,td{
                padding-right:  10px
              }
            `}
            data={listData}
            columns={[
              { title: "指标", render: ele => ele.name, id: "name" },
              {
                title: "环比数据",
                render: ele => <Rate value={+ele.rate}> </Rate>,
                sortKey: "rate",
                id: "rate"
              },
              {
                title: "结果",
                render: ele => ele.value + "%",
                sortKey: "value",
                id: "value"
              }
            ]}
          />
        </BlockArea>
      </div>
    );
  }
}

Norms.propTypes = {};

export default Norms;
