import React, { PureComponent } from "react";
import { BlockArea, Rate } from "components";
import { HeaderTemp, TableTemp as Table } from "view/components";
import fakeData from "config/fakeData";
import { getMoney } from "tools";
const itemObj = {
  outpatientaveragespending: "门急诊均次费用",
  outpatientaveragedrugspending: "门急诊人均药品费用",
  averageprescriptionamount: "平均处方金额",
  hospitalizationaveragespending: "住院均次费用",
  outhospitalaveragedrugspending: "出院病人人均药品费用",
  medicalexaminationaveragespending: "每体检人次费用"
};
class List extends PureComponent {
  constructor(props) {
    super(props);
    this.item = props.location.state.item;
    this.itemName = itemObj[this.item];
    this.columns = [
      {
        title: "科室",
        render: ele => ele.name,
        id: "name"
      },
      ...(this.isDay
        ? []
        : [
            {
              title: "环比数据",
              sortKey: "rate",
              render: ele => <Rate value={ele.rate} />,
              id: "rate"
            }
          ]),
      {
        title: this.itemName,
        sortKey: "value",
        render: ele => getMoney(ele.value),
        id: "value"
      }
    ];
  }
  get isDay() {
    return this.props.location.state.type === "day";
  }
  get listData() {
    const dataArr = fakeData["class"].map((ele, index) => ({
      ...ele,
      to: "/",
      id: index
    }));
    return dataArr;
  }
  render() {
    return (
      <div>
        <HeaderTemp
          small
          title={this.itemName}
          count={getMoney(Math.ceil(Math.random() * 100) + 200)}
        />
        <BlockArea title={"不同科室" + this.itemName}>
          <Table data={this.listData} columns={this.columns} />
        </BlockArea>
      </div>
    );
  }
}

export default List;
