import React from "react";
import { BlockArea, List as ListBase, Rate } from "components";
import { TableTemp as Table } from "view/components";
import styled from "styled-components";
import { DateSelectPageTemplate } from "view/Template";
import fakeData from "config/fakeData";
import { ReactComponent as Approved } from "static/svg/approved.svg";
import { ReactComponent as Occupied } from "static/svg/occupied.svg";
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
          render: ele => (ele.value2 * 100).toFixed(2) + "%",
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
      to: { pathname: "/speproject/beddetail", state: { title: ele.name } },
      id: index
    }));
    return dataArr;
  }
  get content() {
    return (
      <>
        <BlockArea title={"床位使用率"} count={"88%"}>
          <NavList
            list={this.reduceNavItem([
              {
                svg: Approved,
                noLink: true,
                title: "病人占用床位数",
                count: 352,
                rate: this.type === "day" ? null : Math.random() - 0.5
              },
              {
                svg: Occupied,
                noLink: true,
                title: "核定床位",
                count: 800,
                rate: this.type === "day" ? null : Math.random() - 0.5
              }
            ])}
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
  TabList = [
    { content: "日报", id: "day", to: "/speproject/bed/day" },
    { content: "月报", id: "month", to: "/speproject/bed/month" },
    { content: "年报", id: "year", to: "/speproject/bed/year" }
  ];
}

export default Bed;
