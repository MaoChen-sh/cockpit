import React from "react";
import styled from "styled-components";
import { BlockArea, List as ListBase, Chart as ChartBase } from "components";
import { ReactComponent as Normal } from "static/svg/normal.svg";
import { ReactComponent as Pro } from "static/svg/pro.svg";
import { DateSelectPageTemplate } from "view/Template";
import { Link } from "react-router-dom";
const NavList = styled(ListBase)`
  & > li {
    display: flex;
    justify-content: space-around;
  }
`;
const Chart = styled(ChartBase)`
  margin: 8px auto;
  width: 50%;
  height: 120px;
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
  color: ${p => p.color};
  justify-content: center;
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

const colors = ["#3bd6ba", "#5fbaf9", "#efefef"];

class Reserve extends DateSelectPageTemplate {
  getNormalChartOption = data => ({
    color: [colors[0], colors[2]],

    series: [
      {
        type: "pie",
        radius: ["50%", "90%"],
        center: ["50%", "50%"],
        selectedMode: "single",
        data: data
      }
    ]
  });
  getProChartOption = data => ({
    color: [colors[1], colors[2]],
    series: [
      {
        type: "pie",
        radius: ["50%", "90%"],
        center: ["50%", "50%"],
        selectedMode: "single",
        data: data
      }
    ]
  });
  get normalData() {
    return [
      {
        value: this.list[0].count,
        label: {
          formatter: `{d}%`,
          position: "center",
          color: colors[0],
          fontSize: "12px"
        },
        name: "普通号预约就诊率"
      },
      {
        value: 100,
        label: false,
        labelLine: {
          show: false
        },
        name: ""
      }
    ];
  }
  get proData() {
    return [
      {
        value: this.list[1].count,
        label: {
          formatter: `{d}%`,
          position: "center",
          color: colors[1],
          fontSize: "12px"
        },
        name: "专家号预约就诊率"
      },
      {
        value: 100,
        label: false,
        labelLine: {
          show: false
        },
        name: ""
      }
    ];
  }
  get list() {
    const list = [
      {
        svg: Normal,
        title: "普通号预约人数",
        count: Math.ceil(Math.random() * 300 + 200),
        to: {
          pathname: "/speproject/reservelist",
          state: {
            dataType: "count",
            viewType: "normal",
            type: this.type
          }
        }
      },
      {
        svg: Pro,
        title: "专家号预约人数",
        count: Math.ceil(Math.random() * 300 + 200),
        to: {
          pathname: "/speproject/reservelist",
          state: {
            dataType: "count",
            viewType: "pro",
            type: this.type
          }
        }
      }
    ];
    if (this.type !== "day") {
      return list.map(ele => ({
        ...ele,
        rate: Math.random() - 0.5
      }));
    }
    return list;
  }
  get content() {
    return (
      <>
        <BlockArea title={"总预约数"} count={587}>
          <NavList list={this.reduceNavItem(this.list)} />
        </BlockArea>
        <BlockArea>
          <Link
            to={{
              pathname: "/speproject/reservelist",
              state: {
                dataType: "rate",
                viewType: "normal",
                type: this.type
              }
            }}
          >
            <Chart
              svg
              getOptions={this.getNormalChartOption}
              data={this.normalData}
            />
          </Link>
          <Link
            to={{
              pathname: "/speproject/reservelist",
              state: {
                dataType: "rate",
                viewType: "pro",
                type: this.type
              }
            }}
          >
            <Chart
              svg
              getOptions={this.getProChartOption}
              data={this.proData}
            />
          </Link>
          <Legend>
            <LegendItem color={colors[0]}>
              <span>{this.normalData[0].name}</span>
            </LegendItem>
            <LegendItem color={colors[1]}>
              <span>{this.normalData[0].name}</span>
            </LegendItem>
          </Legend>
        </BlockArea>
      </>
    );
  }
  TabList = [
    { content: "日报", id: "day", to: "/speproject/reserve/day" },
    { content: "月报", id: "month", to: "/speproject/reserve/month" },
    { content: "年报", id: "year", to: "/speproject/reserve/year" }
  ];
}

export default Reserve;
