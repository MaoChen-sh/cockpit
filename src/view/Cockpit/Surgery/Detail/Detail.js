import React from "react";
import { TablePageTemplate } from "view/Template";
import { User } from "components";
import fakeUser from "config/fakeUser";
import { random } from "tools";

class Detail extends TablePageTemplate {
  constructor(props) {
    super(props);
    document.title = props.location.state.title;
  }
  get headerProps() {
    return {
      count: random(10, 50),
      title: "手术"
    };
  }
  title = "不同医生门诊人次";
  tableColumns = [
    {
      title: "医生",
      render: ele => <User {...ele.user} />,
      id: "docter"
    },
    {
      title: "手术名称",
      render: ele => ele.surgery,
      id: "name"
    },
    {
      title: "手术台数",
      render: ele => ele.value,
      id: "count"
    }
  ];
  get tableData() {
    return fakeUser.map((ele, index) => ({
      user: ele,
      surgery: [
        "血管损伤修复重建数",
        "剖腹探查术",
        "同种异体肾移植术",
        "同种异体肾移植术(右侧）"
      ][random(0, 3)],
      value: random(1, 10),
      id: index
    }));
  }
}

export default Detail;
