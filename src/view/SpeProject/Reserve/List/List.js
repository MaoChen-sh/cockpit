import React, { PureComponent } from "react";
import { HeaderTemp, TableTemp as Table } from "view/components";
import { BlockArea, Rate } from "components";
import fakeData from "config/fakeData";
class List extends PureComponent {
  get isRate() {
    return this.props.location.state.dataType === "rate";
  }
  get isPro() {
    return this.props.location.state.viewType === "pro";
  }
  get isDay() {
    return this.props.location.state.type === "day";
  }
  columns = [
    {
      title: "科室",
      render: ele => ele.name,
      id: 0
    },
    ...(this.isDay
      ? []
      : [
          {
            title: "环比数据",
            sortKey: "rate",
            render: ele => <Rate value={ele.rate} />,
            id: 1
          }
        ]),
    this.isRate
      ? {
          title: "预约就诊率",
          sortKey: "rate1",
          render: ele => ele.rate1,
          id: 2
        }
      : {
          title: "预约人数",
          sortKey: "value",
          render: ele => ele.value,
          id: 2
        }
  ];
  get listData() {
    return fakeData["class"].map((ele, index) => ({
      ...ele,
      rate1: ((ele.rate + 0.5) * 100).toFixed(2) + "%",
      id: index
    }));
  }
  render() {
    return (
      <div>
        <HeaderTemp
          small
          title={`${this.isPro ? "专家" : "普通"}号预约${
            this.isRate ? "就诊率" : "人数"
          }`}
          count={
            this.isRate
              ? (Math.random() * 100).toFixed(2) + "%"
              : Math.ceil(Math.random() * 100)
          }
        />
        <BlockArea title={"不同患者的检查/等待时间"}>
          <Table data={this.listData} columns={this.columns} />
        </BlockArea>
      </div>
    );
  }
}

export default List;
