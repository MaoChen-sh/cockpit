import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ScrollTable from "./ScrollTable";
import { BlockArea } from "components";
import { selectedItem } from "context";
import { getYMD } from "tools";
class DataDisplay extends PureComponent {
  static contextType = selectedItem;
  get totalData() {
    const valueArr = this.context.dateData.map(ele =>
      parseInt(Math.random() * 1000)
    );
    console.log(this.context.projectData);
    return [
      {
        name: this.context.projectData[0] && this.context.projectData[0].name,
        values: valueArr,
        id: 0
      }
    ];
  }
  getDateStr = dates => {
    const [Y, M, D] = getYMD(dates[0]);
    const [Y1, M1, D1] = getYMD(dates[1]);
    return `${Y}-${M}-${D} — ${Y1}-${M1}-${D1}`;
  };
  scrollTableColumns = (() => {
    const dateArr = this.context.dateData;
    return [
      {
        title: "科室",
        render: ele => ele.name,
        id: 0
      },
      ...dateArr.map((ele, index) => ({
        title: this.getDateStr(ele),
        render: ele => ele["value" + index],
        id: index + 1
      }))
    ];
  })();
  render() {
    const dateArr = this.context.dateData;
    console.log(this.scrollTableColumns);
    return (
      <div>
        <BlockArea title={"总对比结果"}>
          <ScrollTable
            columns={[
              {
                title: "总数",
                render: ele => ele.name,
                id: 0
              },
              ...dateArr.map((ele, index) => ({
                title: this.getDateStr(ele),
                render: ele => ele.values[index],
                id: index + 1
              }))
            ]}
            data={this.totalData}
          />
        </BlockArea>
        <BlockArea title={"科室对比结果"}>
          <ScrollTable
            columns={this.scrollTableColumns}
            data={[
              {
                name: "xxxxxxxxxxxxxxxxxxxxxx",
                rate: 1,
                value0: 2,
                value1: 2,
                value2: 2,
                id: 0
              },
              {
                name: "xx",
                rate: 11,
                value0: 22,
                value1: 22,
                value2: 22,
                id: 1
              },
              {
                name: "y",
                rate: 111,
                value0: "1232132974sadsa4d8aasdsadsadsadsads7d",
                value1: 2123,
                value2: 245,
                id: 2
              },
              {
                name: "yy",
                rate: 1111,
                value0: "4132974sadsa4d8aasdsadsadsadsads7d",
                value1: 1,
                value2: 333,
                id: 3
              }
            ]}
          />
        </BlockArea>
      </div>
    );
  }
}

DataDisplay.propTypes = {};

export default DataDisplay;
