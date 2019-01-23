import React, { PureComponent } from "react";
import { BlockArea } from "components";
import { TableTemp as Table } from "view/components";
import { random } from "tools";

class CountDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.type = props.location.state.type;
    document.title = this.type === "single" ? "散客体检" : "团队体检";
  }
  columns = [
    {
      title: "套餐名称",
      render: ele => ele.name,
      id: "name"
    },
    {
      title: "检查人数",
      render: ele => ele.value,
      id: "count"
    }
  ];
  get tableData() {
    return [
      {
        name: "青年套餐(888元)",
        value: random(1, 50, 0),
        id: 0
      },
      {
        name: "女性套餐(1560元)",
        value: random(1, 50, 0),
        id: 1
      },
      {
        name: "妇科常规套餐(1560元)",
        value: random(1, 50, 0),
        id: 2
      },
      {
        name: "入职基本套餐(260元)",
        value: random(1, 50, 0),
        id: 3
      }
    ];
  }
  render() {
    return (
      <BlockArea
        title={`${
          this.type === "single" ? "散客体检" : "团队体检"
        }不同套餐的检查人数`}
      >
        <Table columns={this.columns} data={this.tableData} />
      </BlockArea>
    );
  }
}

export default CountDetail;
