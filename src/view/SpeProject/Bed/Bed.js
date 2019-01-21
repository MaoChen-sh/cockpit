import React from "react";
import { BlockArea, List as ListBase, Rate } from "components";
import { TableTemp as Table } from "view/components";
import styled from "styled-components";
import { DateSelectPageTemplate } from "view/Template";
import fakeData from "config/fakeData";

const NavList = styled(ListBase)`
  & > li {
    display: flex;
    justify-content: space-around;
  }
`;
class Bed extends DateSelectPageTemplate {
  get columns() {
    if (this.type === "day") {
      return [
        {
          title: "病区",
          render: ele => ele.name,
          id: 0
        },
        {
          title: "病人占用床位数",
          sortKey: "value",
          render: ele => ele.value,
          id: 1
        },
        {
          title: "床位使用率",
          sortKey: "value2",
          render: ele => ele.value,
          id: 2
        }
      ];
    }
    return [
      {
        title: "病区",
        render: ele => ele.name,
        id: 0
      },
      {
        title: "环比数据",
        sortKey: "rate",
        render: ele => <Rate value={ele.rate} />,
        id: 1
      },
      {
        title: "病人占用床位数",
        sortKey: "value",
        render: ele => ele.value,
        id: 2
      },
      {
        title: "床位使用率",
        sortKey: "value2",
        render: ele => (ele.value2 * 100).toFixed(2) + "%",
        id: 3
      }
    ];
  }
  get listData() {
    const dataArr = fakeData["area"].map((ele, index) => ({
      ...ele,
      value2: Math.random(),
      to: "/speproject/beddetail?area=" + ele.name,
      id: index
    }));
    return dataArr;
  }
  get content() {
    return (
      <>
        <BlockArea title={"床位使用率"} count={"88%"}>
          <NavList
            list={this.reduceNavItem(
              Array(2).fill({
                svg: () => 1,
                title: "超声",
                count: 352,
                rate: null,
                to: "/cockpit/outpatient"
              })
            )}
          />
        </BlockArea>

        <BlockArea title={"不同病区的使用床位、床位使用率"}>
          <Table
            defaultStyles={`  td:first-child {
    white-space: nowrap;
  }`}
            data={this.listData}
            columns={this.columns}
          />
        </BlockArea>
      </>
    );
  }
}

export default Bed;
