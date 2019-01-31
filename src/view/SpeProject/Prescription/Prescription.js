import React from "react";
import { BlockArea, Rate } from "components";
import { TableTemp as Table } from "view/components";
import { DateSelectPageTemplate } from "view/Template";
import fakeData from "config/fakeData";

class Prescription extends DateSelectPageTemplate {
  get columns() {
    if (this.type === "day") {
      return [
        {
          title: "病区",
          render: ele => ele.name,
          id: 0
        },
        {
          title: "处方数",
          sortKey: "value",
          render: ele => ele.value,
          id: 1
        },
        {
          title: "中医处方数",
          sortKey: "value2",
          render: ele => ele.value2,
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
        title: "处方数环比数据",
        sortKey: "rate",
        render: ele => <Rate value={ele.rate} />,
        id: 1
      },
      {
        title: "处方数",
        sortKey: "value",
        render: ele => ele.value,
        id: 2
      },

      {
        title: "中医处方数",
        sortKey: "value2",
        render: ele => ele.value2,
        id: 3
      }
    ];
  }
  get listData() {
    const dataArr = fakeData["class"].map((ele, index) => ({
      ...ele,
      value2: parseInt(ele.value / (1 + Math.random() * 10)),
      to: {
        pathname: "/speproject/prescriptiondetail",
        state: {
          title: ele.name,
          type: this.type
        }
      },
      id: index
    }));
    return dataArr;
  }
  get content() {
    return (
      <>
        <BlockArea title={"处方总数"} count={1817} />
        <BlockArea title={"不同科室的处方数"}>
          <Table data={this.listData} columns={this.columns} />
        </BlockArea>
      </>
    );
  }
  TabList = [
    { content: "日报", id: "day", to: "/speproject/prescription/day" },
    { content: "月报", id: "month", to: "/speproject/prescription/month" },
    { content: "年报", id: "year", to: "/speproject/prescription/year" }
  ];
}

export default Prescription;
