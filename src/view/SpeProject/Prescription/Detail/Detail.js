import React from "react";
import { TablePageTemplate } from "view/Template";
import { User } from "components";
import fakeUser from "config/fakeUser";
import { random } from "tools";
class Detail extends TablePageTemplate {
  constructor(props) {
    super(props);
    document.title = props.location.state.title;
    this.title = props.location.state.title + "不同医生处方数";
  }
  get headerProps() {
    return {
      count: Math.ceil(Math.random() * 100 + 100),
      title: this.props.location.state.title + "处方数"
    };
  }
  tableColumns = [
    {
      title: "医生",
      render: ele => <User {...ele.user} />,
      id: "docter"
    },
    {
      title: "处方数",
      render: ele => ele.value,
      id: "count"
    },
    {
      title: "中医处方数",
      render: ele => ele.value2,
      id: "count2"
    }
  ];
  get tableData() {
    return fakeUser.map((ele, index) => ({
      user: ele,
      value: random(1, 50, 0),
      value2: random(1, 50, 0),
      id: index
    }));
  }
}
export default Detail;
