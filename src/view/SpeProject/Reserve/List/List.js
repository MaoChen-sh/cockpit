import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { HeaderTemp, TableTemp as Table } from "view/components";
import { BlockArea } from "components";
import fakeData from "config/fakeData";
class List extends PureComponent {
  get isRate() {
    return this.props.match.params.dataType === "rate";
  }
  get isPro() {
    return this.props.match.params.viewType === "pro";
  }
  columns = [
    {
      title: "科室",
      render: ele => ele.name,
      id: 0
    },
    this.isRate
      ? {
          title: "预约就诊率",
          render: ele => ele.rate,
          id: 1
        }
      : {
          title: "预约人数",
          render: ele => ele.value,
          id: 1
        }
  ];
  get listData() {
    return fakeData["class"].map((ele, index) => ({
      ...ele,
      rate: ((ele.rate + 0.5) * 100).toFixed(2) + "%",
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

List.propTypes = {};

export default List;
