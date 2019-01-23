import React, { PureComponent } from "react";
import { BlockArea } from "components";
import { TableTemp as Table } from "view/components";
import { getTimeStrFromSecond, random } from "tools";
import fakeData from "config/fakeData";
class TimeDetail extends PureComponent {
  columns = [
    {
      title: "科室",
      render: ele => ele.name,
      id: "name"
    },
    {
      title: "平均就诊时间",
      sortKey: "time",
      render: ele => getTimeStrFromSecond(ele.time),
      id: "time"
    }
  ];
  tableData = fakeData["class"].map((ele, index) => ({
    ...ele,
    time: random(120, 2000, 0),
    id: index
  }));
  render() {
    return (
      <BlockArea title={"不同科室的平均就诊时间"}>
        <Table noArrow columns={this.columns} data={this.tableData} />
      </BlockArea>
    );
  }
}

export default TimeDetail;
