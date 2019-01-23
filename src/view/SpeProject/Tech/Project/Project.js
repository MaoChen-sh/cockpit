import React, { PureComponent } from "react";
import { HeaderTemp, TableTemp as Table } from "view/components";
import { BlockArea, User } from "components";
const fakeData = Array(5)
  .fill("")
  .map(() => ({
    user: {
      isMale: Math.random() > 0.5,
      name: "周熙",
      depart: "超声室1"
    },
    checkTime: Math.ceil(Math.random() * 10 + 5),
    waitTime: Math.ceil(Math.random() * 10 + 25)
  }));
const projectNameObj = {
  ultrasound: "超声",
  ct: "CT",
  mr: "MR",
  dr: "DR",
  hemodialysis: "血透",
  endoscopy: "内镜检查",
  peritoneal: "腹透",
  digitalgastrointestinal: "数字肠胃检查",
  breast: "乳腺检查",
  electrocardiogram: "心电图",
  interventional: "介入治疗检查"
};
class Project extends PureComponent {
  columns = [
    {
      title: "患者",
      render: ele => <User {...ele.user}> </User>,
      id: 0
    },
    {
      title: "平均检查时间",
      render: ele => (ele.checkTime ? ele.checkTime + "分" : ""),
      id: 1
    },
    {
      title: "平均等待时间",
      render: ele => (ele.waitTime ? ele.waitTime + "分" : ""),
      id: 2
    }
  ];
  get listData() {
    const dataArr = fakeData.map((ele, index) => ({
      ...ele,
      to: "/",
      id: index
    }));
    return dataArr;
  }
 
  render() {
    const project = projectNameObj[this.props.location.state.project];
    return (
      <div>
        <HeaderTemp
          defaultStyles={`margin-top: -66px; padding-top: 66px;`}
          subList={[
            {
              title: project + "平均检查时间",
              count: "12分"
            },
            {
              title: project + "平均等待时间",
              count: "33分"
            }
          ]}
        />
        <BlockArea title={"不同患者的检查/等待时间"}>
          <Table data={this.listData} columns={this.columns} />
        </BlockArea>
      </div>
    );
  }
}

export default Project;
