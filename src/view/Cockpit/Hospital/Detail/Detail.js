import React from "react";
import { TablePageTemplate } from "view/Template";
import { User } from "components";
import fakeUser from "config/fakeUser";
import { random } from "tools";

const strObj = {
  in: "在院人数",
  leave: "出院人数",
  enter: "入院人数"
};
class Detail extends TablePageTemplate {
  constructor(props) {
    super(props);
    this.type = props.match.params.type;
    this.dataType = props.location.state.dataType;
    this.name = props.location.state.name;
    document.title =
      (this.dataType === "area" ? "病区" : "科室") + strObj[this.type];
  }
  get headerProps() {
    return {
      count: Math.ceil(Math.random() * 100 + 100),
      title: this.name + strObj[this.type]
    };
  }
  title = "主治医生负责病患人数";
  tableColumns = [
    {
      title: "医生",
      render: ele => <User {...ele.user} />,
      id: "docter"
    },
    {
      title: "病患数",
      render: ele => ele.value,
      id: "count"
    }
  ];
  get tableData() {
    return fakeUser.map((ele, index) => ({
      user: ele,
      value: random(1, 30, 0),
      id: index
    }));
  }
}

export default Detail;
