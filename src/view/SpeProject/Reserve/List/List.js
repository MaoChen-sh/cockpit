import React, { PureComponent } from "react";
import { HeaderTemp, TableTemp as Table } from "view/components";
import { BlockArea, Rate } from "components";
import fakeData from "config/fakeData";
import { random } from "tools";
class List extends PureComponent {
  constructor(props) {
    super(props);
    document.title =
      (this.isPro ? "专家号预约" : "普通号预约") +
      (this.isRate ? "就诊率" : "");
  }
  get isRate() {
    return this.props.location.state.dataType === "rate";
  }
  get isPro() {
    return this.props.location.state.viewType === "pro";
  }
  get type() {
    return this.props.location.state.type;
  }
  columns = [
    {
      title: "科室",
      render: ele => ele.name,
      id: "name"
    },
    ...(this.type === "day"
      ? []
      : [
          {
            title: "环比数据",
            sortKey: "rate",
            render: ele => <Rate value={ele.rate} />,
            id: "rate"
          }
        ]),
    this.isRate
      ? {
          title: "预约就诊率",
          sortKey: "rate1",
          render: ele => ele.rate1 + "%",
          id: "rate1"
        }
      : {
          title: "预约人数",
          sortKey: "value",
          render: ele => ele.value,
          id: "value"
        }
  ];
  get listData() {
    return fakeData["class"].map((ele, index) => ({
      ...ele,
      rate1: random(0, 100, 2),
      to: {
        pathname: "/speproject/reservedetail",
        state: {
          isPro: this.isPro,
          isRate: this.isRate,
          title: ele.name,
          type: this.type
        }
      },

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
