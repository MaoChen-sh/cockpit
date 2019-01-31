import React, { PureComponent } from "react";
import { TableTemp as Table } from "view/components";
import { BlockArea } from "components";
import fakeData from "config/fakeData";
import { random } from "tools";
class TypeDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.title = props.location.state.title;
    document.title = this.title;
    this.state = {
      dataType: "class"
    };
  }
  onOptionChange = val => {
    this.setState({
      dataType: val === "科室" ? "class" : "area"
    });
  };
  get columns() {
    return [
      {
        options: ["科室", "病区"],
        onChange: this.onOptionChange,
        render: ele => ele.name,
        id: "name"
      },
      {
        title: "手术名称",
        sortKey: "surgery",
        render: ele => ele.surgery,
        id: "surgery"
      },
      {
        title: "手术台数",
        sortKey: "value",
        render: ele => ele.value,
        id: "value"
      }
    ];
  }
  get tableData() {
    const { dataType } = this.state;
    const dataArr = fakeData[dataType].map((ele, index) => ({
      ...ele,
      surgery: [
        "血管损伤修复重建数",
        "剖腹探查术",
        "同种异体肾移植术",
        "同种异体肾移植术(右侧）"
      ][random(0, 3)],
      rate: Math.random() - 0.5,
      id: index
    }));

    return dataArr;
  }
  render() {
    const { dataType } = this.state;

    return (
      <BlockArea
        title={`不同${dataType === "class" ? "科室" : "病区"}的${
          this.title
        }台数`}
      >
        <Table noArrow columns={this.columns} data={this.tableData} />
      </BlockArea>
    );
  }
}

export default TypeDetail;
