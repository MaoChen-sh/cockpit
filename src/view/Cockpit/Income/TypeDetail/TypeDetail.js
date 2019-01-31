import React, { PureComponent } from "react";
import { TableTemp as Table } from "view/components";
import { BlockArea, Rate } from "components";
import fakeData from "config/fakeData";
import { random, getMoney } from "tools";

class Detail extends PureComponent {
  get type() {
    const {
      match: {
        params: { type }
      }
    } = this.props;
    return type;
  }
  strObj = {
    total: "医疗总收入",
    uninhospital: "门急诊收入",
    inhospital: "住院收入",
    nondrug: "非药品收入",
    drug: "药品收入"
  };
  tableColumns = [
    {
      title: "费用类别",
      render: ele => ele.name,
      id: "name"
    },
    {
      title: "费用金额",
      sortKey: "money",
      className: "text-right pr-20__i",
      render: ele => getMoney(ele.money),
      id: "money"
    },
    {
      title: "环比数据",
      sortKey: "rate",
      render: ele => <Rate value={ele.rate} />,
      id: "rate"
    },
    {
      title: "费用占比",
      sortKey: "rate2",
      render: ele => ele.rate2 + "%",
      id: "rate2"
    }
  ];
  get tableData() {
    return fakeData["type"].map((ele, index) => ({
      ...ele,
      rate2: random(0, 100, 2),
      id: index
    }));
  }
  render() {
    return (
      <BlockArea title={"不同类别的" + this.strObj[this.type]}>
        <Table noArrow data={this.tableData} columns={this.tableColumns} />
      </BlockArea>
    );
  }
}

export default Detail;
