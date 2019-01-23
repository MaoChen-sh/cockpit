import React from "react";
import { TablePageTemplate } from "view/Template";
import { User } from "components";
import fakeUser from "config/fakeUser";
import { random } from "tools";

class Detail extends TablePageTemplate {
  constructor(props){
    super(props)
    document.title = props.location.state.title
  }
  get headerProps() {
    return {
      count: Math.ceil(Math.random() * 100 + 100),
      title: "门诊人次"
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
      title: "门诊人次",
      render: ele => ele.value,
      id: "count"
    }
  ];
  get tableData() {
    return fakeUser.map((ele, index) => ({
      user: ele,
      value: random(1, 50, 0),
      id: index
    }));
  }
}

export default Detail;
