import React from "react";
import { TablePageTemplate } from "view/Template";
import { User } from "components";
import fakeUser from "config/fakeUser";
import { random, getMoney } from "tools";

const strObj = {
  total: "医疗总收入",
  uninhospital: "门急诊收入",
  inhospital: "住院收入",
  nondrug: "非药品收入",
  drug: "药品收入"
};
class Detail extends TablePageTemplate {
  constructor(props) {
    super(props);
    this.type = props.match.params.type;
    this.dataType = props.location.state.dataType;
    this.name = props.location.state.name;
    document.title = "科室" + strObj[this.type];
    this.title = "不同医生的" + strObj[this.type];

  }
  get headerProps() {
    return {
      count: getMoney(random(10000, 100000)),
      title: this.name + strObj[this.type]
    };
  }
  tableColumns = [
    {
      title: "医生",
      render: ele => <User {...ele.user} />,
      id: "docter"
    },
    {
      title: "医疗总收入",
      className: "text-right pr-20__i",
      render: ele => getMoney(ele.value),
      id: "count"
    }
  ];
  get tableData() {
    return fakeUser.map((ele, index) => ({
      user: ele,
      value: random(1000, 10000),
      id: index
    }));
  }
}

export default Detail;
