import React, { PureComponent } from "react";
import { BlockArea, Chart, User } from "components";
import { TableTemp as Table } from "view/components";
import styled from "styled-components";
import fakeUser from "config/fakeUser";
import { random } from "tools";
import echarts from "echarts/lib/echarts";
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
  & > span {
    width: 40%;
  }
  & > span:last-child {
    font-size: 16px;
    color: #333;
    margin-left: 10px;
    font-weight: bold;
  }
  &::before {
    content: "";
    display: inline-block;
    flex-shrink: 0;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${p => p.color};
    margin-right: 10px;
  }
`;
const colors = [
  "#32d9c1",
  "#ffc75b",
  "#f88287",
  "#24b1f3",
  "#59B7FF",
  "#2599f2"
];

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.isPro = this.props.location.state.isPro;
    this.isRate = this.props.location.state.isRate;
    this.type = this.props.location.state.type;
    this.title = this.props.location.state.title;
    document.title = this.title;
  }
  getOptions = data => {
    if (this.isRate) {
      return {
        grid: {
          top: 0,
          left: "10",
          right: "56",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          show: false
        },
        yAxis: {
          type: "category",
          data: data.map(ele => ele.name),
          offset: 50,
          axisLabel: {
            align: "left"
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            barMaxWidth: 8,
            itemStyle: {
              barBorderRadius: 4,
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: "#60d1ff" },
                { offset: 1, color: "#2998fa" }
              ])
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: `{c}%`,
                color: "#2998FA;",
                fontSize: "10px"
              }
            },
            data: data.map(ele => ele.value)
          }
        ]
      };
    }
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
  get chartData() {
    if (this.isRate) {
      return [
        { value: random(0, 100, 2), name: "微信" },
        { value: random(0, 100, 2), name: "自助机" },
        { value: random(0, 100, 2), name: "省平台" },
        { value: random(0, 100, 2), name: "电话预约" },
        { value: random(0, 100, 2), name: "医生站" },
        { value: random(0, 100, 2), name: "其他" }
      ];
    }
    return [
      { value: random(1, 300), name: "微信" },
      { value: random(1, 300), name: "自助机" },
      { value: random(1, 300), name: "省平台" },
      { value: random(1, 300), name: "电话预约" },
      { value: random(1, 300), name: "医生站" },
      { value: random(1, 300), name: "其他" }
    ];
  }

  get columns() {
    if (this.isRate) {
      return [
        {
          title: "医生",
          render: ele => <User {...ele.user} />,
          id: "doctor"
        },
        {
          title: "预约就诊率",
          render: ele => ele.rate + "%",
          id: "rate"
        }
      ];
    }
    return [
      {
        title: "医生",
        render: ele => <User {...ele.user} />,
        id: "doctor"
      },
      {
        title: "预约人数",
        render: ele => ele.value,
        id: "count"
      }
    ];
  }

  get tableData() {
    return fakeUser.map((ele, index) => ({
      user: ele,
      value: random(1, 50),
      rate: random(0, 100, 2),
      id: index
    }));
  }
  render() {
    return (
      <>
        {this.isPro && (
          <BlockArea
            title={`${this.title}不同专家号${this.isRate ? "就诊率" : "预约数"}`}
          >
            <Table noArrow columns={this.columns} data={this.tableData} />
          </BlockArea>
        )}
        <BlockArea
          defaultStyles={`padding: 14px 10px;`}
          title={`${this.title}${this.isPro ? "专家" : "普通"}号的预约${
            this.isRate ? "预约就诊率" : "途径人数"
          }`}
        >
          <Chart getOptions={this.getOptions} data={this.chartData} />
          {!this.isRate && (
            <Legend>
              {this.chartData.map((ele, index) => (
                <LegendItem color={colors[index]} key={index}>
                  <span>{ele.name}</span>
                  <span>{ele.value}</span>
                </LegendItem>
              ))}
            </Legend>
          )}
        </BlockArea>
      </>
    );
  }
}

export default Detail;
