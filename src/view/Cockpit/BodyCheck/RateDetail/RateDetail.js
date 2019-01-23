import React, { PureComponent } from "react";
import { Tab as TabBase, BlockArea, Chart } from "components";
import styled from "styled-components";
import { random } from "tools";

const Legend = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
`;
const LegendItem = styled.li`
  width: 50%;
  display: flex;
  align-items: center;
  height: 26px;
  font-size: 12px;
  color: #666;


  &::before {
    content: "";
    display: inline-block;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${p => p.color};
    margin-right: 10px;
  }
`;
const colors = ["#32d9c1", "#ffc75b", "#f88287", "#24b1f3"];

const Tab = styled(TabBase)`
  justify-content: center;
  padding: 14px 3.2vw;
  li {
    width: 32vw;
    height: 30px;
    background: #fff;
    margin: 0 2.5vw;
    border-radius: 15px;
    font-size: 14px;
    color: #999;
    &.active {
      background: #1baffa;
      color: #fff;
    }
  }
`;
class RateDetail extends PureComponent {
  tabList = [
    {
      content: "团队体检",
      id: 0,
      to: `/cockpit/bodycheck/ratedetail?type=0`
    },
    {
      content: "散客体检",
      id: 1,
      to: `/cockpit/bodycheck/ratedetail?type=1`
    }
  ];
  get activeId() {
    const { search } = this.props.location;
    return search ? +search.match(/\d/)[0] : 0;
  }
  get chartData() {
    return [
      { value: random(0, 100), name: "青年套餐(888元)" },
      { value: random(0, 100), name: "女性套餐(1560元)" },
      { value: random(0, 100), name: "妇科常规套餐(1560元)" },
      { value: random(0, 100), name: "入职基本套餐(260元)" }
    ];
  }
  getOptions = data => {
    return {
      color: colors,
      series: [
        {
          type: "pie",
          radius: ["50%", "90%"],
          center: ["50%", "50%"],
          selectedMode: "single",
          label: {
            formatter: `{d}%`,
            color: "#4a4a4a",
            fontSize: "12px"
          },
          labelLine: { length: 0 },
          data: data
        }
      ]
    };
  };
  render() {
    return (
      <>
        <Tab activeId={this.activeId} list={this.tabList} />
        <BlockArea
          title={`${this.activeId === 0 ? "团队体检" : "散客体检"}套餐占比`}
        >
          <Chart
            defaultStyles={`height: 120px;`}
            getOptions={this.getOptions}
            data={this.chartData}
          />
          <Legend>
            {this.chartData.map((ele, index) => (
              <LegendItem color={colors[index]} key={index}>
                <span>{ele.name}</span>
              </LegendItem>
            ))}
          </Legend>
        </BlockArea>
      </>
    );
  }
}

export default RateDetail;
