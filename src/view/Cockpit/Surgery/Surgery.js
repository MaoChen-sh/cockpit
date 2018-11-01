import React, { PureComponent } from "react";
import { Chart, BlockArea, RightArrow } from "components";
import styled from "styled-components";
import { $fetch, apis } from "config";
import { ListTemp, HeaderTemp } from "view/Cockpit/components";
import fakeData from "config/fakeData";
const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  & > li {
    width: 33%;
    height: 42px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:first-child {
      border-left: none;
    }
    border-left: 1px dashed #c6c6c6;
    h4 {
      font-size: 12px;
      color: #6b6b6b;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 16px;
        color: #333333;
        font-weight: bold;
      }
      i {
        margin-left: 4px;
      }
    }
  }
`;
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

  & > span:last-child {
    font-size: 16px;
    color: #333;
    margin-left: 10px;
    font-weight: bold;
  }
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

class Surgery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      countListUp: true,
      dataType: "area"
    };
  }

  onCountListSort = () => {
    this.setState({
      countListUp: !this.state.countListUp
    });
  };
  onOptionChange = val => {
    this.setState({
      dataType: val === "科室" ? "class" : "area"
    });
  };
  render() {
    const { countListUp, dataType } = this.state;
    const colors = ["#32d9c1", "#ffc75b", "#f88287", "#24b1f3"];
    return (
      <div>
        <HeaderTemp small title={"手术台数"} count={34} />
        <BlockArea title={"不同类别的手术台数"}>
          <NavList>
            {[
              {
                title: "门急诊手术",
                count: 8,
                to: "/cockpit/outpatient"
              },
              {
                title: "择期手术",
                count: 34,
                to: "/cockpit/surgery"
              },
              {
                title: "急诊手术",
                count: 2,
                to: ""
              }
            ].map((ele, index) => (
              <li key={index}>
                <h4>{ele.title}</h4>
                <p>
                  <span>{ele.count}</span>
                  <RightArrow />
                </p>
              </li>
            ))}
          </NavList>
        </BlockArea>
        <BlockArea title={"不同级别手术台数"}>
          <Chart
            defaultStyles={`height: 120px;`}
            options={{
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
                  data: [
                    { value: 89, name: "一类手术" },
                    { value: 30, name: "二类手术" },
                    { value: 5, name: "三类手术" },
                    { value: 10, name: "四类和特类手术" }
                  ]
                }
              ]
            }}
          />
          <Legend>
            {[
              { value: 89, name: "一类手术" },
              { value: 30, name: "二类手术" },
              { value: 5, name: "三类手术" },
              { value: 10, name: "四类和特类手术" }
            ].map((ele, index) => (
              <LegendItem color={colors[index]} key={index}>
                <span>{ele.name}</span>
                <span>{ele.value}</span>
              </LegendItem>
            ))}
          </Legend>
        </BlockArea>
        <BlockArea title={"不同科室手术例数"}>
          <ListTemp
            defaultStyles={`.list-title{padding-right: 42px}`}
            title={[
              {
                content: "病区",
                options: ["病区", "科室"],
                onChange: this.onOptionChange
              },
              {
                content: "手术例数",
                sort: countListUp ? "up" : "down",
                onSort: this.onCountListSort
              }
            ]}
            list={fakeData[dataType]
              .sort((a, b) => (countListUp ? -1 : 1) * (a.value - b.value))
              .map(ele => ({
                ...ele,
                to: "/"
              }))}
          />
        </BlockArea>
      </div>
    );
  }
}

export default Surgery;
