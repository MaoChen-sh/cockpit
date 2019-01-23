import React, { PureComponent } from "react";
import { Tab as TabBase, BlockArea } from "components";
import { TableTemp as Table } from "view/components";
import styled from "styled-components";
import fakeData from "config/fakeData";
import { random } from "tools";

const Tab = styled(TabBase)`
  padding: 14px 3.2vw;
  li {
    width: 21.3vw;
    height: 30px;
    background: #fff;
    border-radius: 15px;
    font-size: 14px;
    color: #999;
    &.active {
      background: #1baffa;
      color: #fff;
    }
  }
`;
class LevelDetail extends PureComponent {
  state = {
    dataType: "class"
  };
  columns = [
    {
      options: ["科室", "病区"],
      onChange: this.onOptionChange,
      render: ele => ele.name,
      id: "name"
    },
    {
      title: "手术名称",
      sortKey: "surgery",
      render: ele => ele.surgery,
      id: "surgery"
    },
    {
      title: "手术台数",
      sortKey: "value",
      render: ele => ele.value,
      id: "value"
    }
  ];
  onOptionChange = val => {
    this.setState({
      dataType: val === "科室" ? "class" : "area"
    });
  };
  get tableData() {
    const { dataType } = this.state;
    const dataArr = fakeData[dataType].map((ele, index) => ({
      ...ele,
      surgery: [
        "血管损伤修复重建数",
        "剖腹探查术",
        "同种异体肾移植术",
        "同种异体肾移植术(右侧）"
      ][random(0, 3)],
      rate: Math.random() - 0.5,
      value: random(1, 50),
      id: index
    }));

    return dataArr;
  }
  tabList = [
    {
      content: "一类",
      id: 0,
      to: `/cockpit/surgery/leveldetail?type=0`
    },
    {
      content: "二类",
      id: 1,
      to: `/cockpit/surgery/leveldetail?type=1`
    },
    {
      content: "三类",
      id: 2,
      to: `/cockpit/surgery/leveldetail?type=2`
    },
    {
      content: "四类和特类",
      id: 3,
      to: `/cockpit/surgery/leveldetail?type=3`
    }
  ];
  get activeId() {
    const { search } = this.props.location;
    return search ? +search.match(/\d/)[0] : 0;
  }
  render() {
    return (
      <div>
        <Tab activeId={this.activeId} list={this.tabList} />
        <BlockArea title={"不同级别手术台数"}>
          <Table columns={this.columns} data={this.tableData} />
        </BlockArea>
      </div>
    );
  }
}

export default LevelDetail;
