import React from "react";
import { TablePageTemplate } from "view/Template";
import { Rate } from "components";
import normsData from "../normsData";
import fakeData from "config/fakeData";
import { random } from "tools";
class Detail extends TablePageTemplate {
  constructor(props) {
    super(props);
    const { norm, item } = props.location.state;
    this.item = item;
    document.title = normsData[norm].title;
    this.title = normsData[norm].title + "管理统计";
    this.tableColumns = [
      {
        title: "病区",
        render: ele => ele.name,
        id: "docter"
      },
      {
        title: "环比数据",
        render: ele => <Rate value={ele.rate} />,
        sortKey: "rate",
        id: "rate"
      },
      {
        title: this.item,
        render: ele => ele.value + "%",
        sortKey: "value",
        id: "value"
      }
    ];
  }
  noHeader = true;

  get tableData() {
    return fakeData["area"].map((ele, index) => ({
      ...ele,
      value: random(1, 100, 2),
      id: index
    }));
  }
}
export default Detail;
