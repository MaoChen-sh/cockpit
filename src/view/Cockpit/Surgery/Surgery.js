import React, { PureComponent } from "react";
import { Header, Chart, BlockArea, List, RightArrow } from "components";
import styled from "styled-components";
import { $fetch, apis } from "config";

const HeaderContent = styled.div`
  color: #fff;
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 16px;
  line-height: 1;
  h3 {
    font-size: 12px;
    opacity: 0.8;
    margin-bottom: 6px;
  }
  p {
    font-size: 32px;
  }
`;
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
      countListUp: true
    };
  }

  onCountListSort = () => {
    this.setState({
      countListUp: !this.state.countListUp
    });
  };

  render() {
    const { countListUp } = this.state;
    const colors = ["#32d9c1", "#ffc75b", "#f88287", "#24b1f3"];
    return (
      <div>
        <Header defaultStyles={`margin-top: -66px; padding-top: 66px;`}>
          <HeaderContent>
            <h3>手术台数</h3>
            <p>34</p>
          </HeaderContent>
        </Header>
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
          <List
            defaultStyles={`.list-title{padding-right: 42px}`}
            title={[
              <div key={0}>科室/病区</div>,
              <div
                className={`list_title--sort ${countListUp ? "up" : "down"}`}
                key={1}
                onClick={this.onCountListSort}
              >
                手术例数
              </div>
            ]}
            // list={distributionList
            //   .sort(
            //     (a, b) =>
            //       (countListUp ? -1 : 1) *
            //       (a.outpatientEmergencyRegistration -
            //         b.outpatientEmergencyRegistration)
            //   )
            //   .map(ele => {
            //     const {
            //       departmentName: name,
            //       outpatientEmergencyRegistration: count
            //     } = ele;
            //     return {
            //       content: (
            //         <CountItem>
            //           <span>{name}</span>
            //           <span>
            //             {count} <RightArrow shadow={false} />
            //           </span>
            //         </CountItem>
            //       )
            //     };
            //   })}
          />
        </BlockArea>
      </div>
    );
  }
}

export default Surgery;
