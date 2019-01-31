import React from "react";
import { Rate } from "components";
import { TablePageTemplate } from "view/Template";
import { random, getMoney } from "tools";

import fakeData from "config/fakeData";
const itemObj = {
  outpatientaveragespending: "门急诊均次费用",
  outpatientaveragedrugspending: "门急诊人均药品费用",
  averageprescriptionamount: "平均处方金额",
  hospitalizationaveragespending: "住院均次费用",
  outhospitalaveragedrugspending: "出院病人人均药品费用"
};
class Detail extends TablePageTemplate {
  constructor(props) {
    super(props);
    const { item, type } = props.location.state;
    this.item = item;
    this.type = type;
    this.itemName = itemObj[item];
    this.title = "不同科室" + this.itemName;
    document.title = this.itemName;
    this.tableColumns = [
      {
        title: "科室",
        render: ele => ele.name,
        id: "name"
      },
      ...(type === "day"
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
        className:'text-right pr-20__i',
        render: ele => getMoney(ele.value),
        id: "value"
      }
    ];
  }
  get headerProps() {
    return {
      title: this.itemName,
      count: getMoney(random(10000, 100000))
    };
  }

  get tableData() {
    const dataArr = fakeData["class"].map((ele, index) => ({
      ...ele,
      value: random(1000, 10000),
      id: index
    }));
    return dataArr;
  }
}
export default Detail;
