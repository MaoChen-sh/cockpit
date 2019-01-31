import React, { PureComponent } from "react";
import { BlockArea, Chart } from "components";
import styled from "styled-components";
import { random, getYMD } from "tools";
import echarts from "echarts/lib/echarts";
const Legend = styled.ul`
  padding: 0 10px;
  text-align: right;
`;
const LegendItem = styled.li`
  display: inline-block;
  align-items: center;
  height: 12px;
  margin-left: 20px;
  font-size: 10px;
  color: #666;
  justify-content: center;
  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${p => p.color};
    margin-right: 6px;
  }
`;
const oneDay = 24 * 3600 * 1000;
const TEXT = {
  hospitalization: "住院",
  emergency: "急诊",
  outpatient: "门诊",
  first: "一类",
  second: "二类",
  third: "三类",
  fourth: "四类"
};
const colors = ["#ffac19", "#0085fe", "#00b562"];
const levelColors = ["#F06743", "#FFC702", "#2EB2FF", "#56C000"];
class TimeDetail extends PureComponent {
  get beginDate() {
    const {
      location: { search }
    } = this.props;
    return search.match(/beginDate=([\d-]+)/)[1];
  }
  get endDate() {
    const {
      location: { search }
    } = this.props;
    return search.match(/endDate=([\d-]+)/)[1];
  }
  get DayLength() {
    return 1 + (new Date(this.endDate) - new Date(this.beginDate)) / oneDay;
  }
  typeList = ["hospitalization", "emergency", "outpatient"];
  typeData = {
    emergency: Array(this.DayLength)
      .fill("")
      .map(ele => random(10, 50)),

    outpatient: Array(this.DayLength)
      .fill("")
      .map(ele => random(10, 50)),
    hospitalization: Array(this.DayLength)
      .fill("")
      .map(ele => random(10, 50))
  };
  getTypeOptions = data => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            type: "dotted",
            color: "#999"
          }
        },
        extraCssText: "box-shadow: 0 0 4px rgba(141,141,141,0.50)",

        backgroundColor: "#fff",
        textStyle: {
          color: "#666",
          fontSize: 10
        }
      },
      grid: {
        left: "24px",
        right: "20px",
        top: "20px",
        bottom: "16px"
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            show: false
          },
          data: data.hospitalization.map((ele, index) =>
            getYMD(
              new Date(new Date(this.beginDate).valueOf() + oneDay * index)
            )
              .map(ele => (ele < 10 ? "0" + ele : ele))
              .join(".")
          ),
          min: 0,
          axisLine: {
            lineStyle: {
              color: " #ddd"
            }
          },
          axisLabel: {
            interval: data.hospitalization.length - 2,
            margin: 4,
            color: "#666",
            fontSize: 10
          }
        }
      ],
      yAxis: {
        splitNumber: 3,
        type: "value",
        axisLine: {
          lineStyle: {
            color: " #ddd"
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          margin: 4,
          color: "#666",
          fontSize: 10
        }
      },
      series: [
        {
          name: "住院",
          data: data.hospitalization,
          type: "line",
          showSymbol: false,
          symbol: "emptyCircle",
          symbolSize: 6,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(255,203,84,0.5)"
              },
              {
                offset: 1,
                color: "rgba(255,243,222,1)"
              }
            ])
          },
          color: colors[0],
          lineStyle: {
            color: colors[0],
            type: "dotted",
            width: 1
          }
        },
        {
          name: "急诊",
          data: data.emergency,
          type: "line",
          showSymbol: false,
          symbol: "emptyCircle",
          symbolSize: 6,

          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0,183,255,0.5)"
              },
              {
                offset: 1,
                color: "rgba(20,193,255,1)"
              }
            ])
          },
          color: colors[1],
          lineStyle: {
            color: colors[1],
            type: "dotted",
            width: 1
          }
        },
        {
          name: "门诊",
          data: data.outpatient,
          type: "line",
          showSymbol: false,
          symbol: "emptyCircle",
          symbolSize: 6,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(3,221,59,0.5)"
              },
              {
                offset: 1,
                color: "rgba(159,255,197,1)"
              }
            ])
          },
          color: colors[2],
          lineStyle: {
            color: colors[2],
            type: "dotted",
            width: 1
          }
        }
      ]
    };
  };

  levelList = ["first", "second", "third", "fourth"];
  levelData = {
    first: Array(this.DayLength)
      .fill("")
      .map(ele => random(30, 50)),
    second: Array(this.DayLength)
      .fill("")
      .map(ele => random(20, 40)),
    third: Array(this.DayLength)
      .fill("")
      .map(ele => random(10, 30)),
    fourth: Array(this.DayLength)
      .fill("")
      .map(ele => random(20, 40))
  };
  getLevelOptions = data => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            type: "dotted",
            color: "#999"
          }
        },
        extraCssText: "box-shadow: 0 0 4px rgba(141,141,141,0.50)",
        backgroundColor: "#fff",
        textStyle: {
          color: "#666",
          fontSize: 10
        }
      },
      grid: {
        left: "24px",
        right: "20px",
        top: "20px",
        bottom: "16px"
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            show: false
          },
          data: data.first.map((ele, index) =>
            getYMD(
              new Date(new Date(this.beginDate).valueOf() + oneDay * index)
            )
              .map(ele => (ele < 10 ? "0" + ele : ele))
              .join(".")
          ),
          min: 0,
          axisLine: {
            lineStyle: {
              color: " #ddd"
            }
          },
          axisLabel: {
            interval: data.first.length - 2,
            margin: 4,
            color: "#666",
            fontSize: 10
          }
        }
      ],
      yAxis: {
        splitNumber: 3,
        type: "value",
        axisLine: {
          lineStyle: {
            color: " #ddd"
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          margin: 4,
          color: "#666",
          fontSize: 10
        }
      },
      series: this.levelList.map((ele, index) => ({
        name: TEXT[ele],
        type: "line",
        smooth: true,
        showSymbol: false,
        data: data[ele],
        color: levelColors[index],
        lineStyle: {
          width: 1
        }
      }))
    };
  };
  render() {
    return (
      <>
        <BlockArea title="本月每天不同类别的手术例数">
          <Legend>
            {this.typeList.map((ele, index) => (
              <LegendItem color={colors[index]} key={ele}>
                <span>{TEXT[ele]}</span>
              </LegendItem>
            ))}
          </Legend>
          <Chart getOptions={this.getTypeOptions} data={this.typeData} />
        </BlockArea>
        <BlockArea title="本月每天不同级别的手术例数">
          <Legend>
            {this.levelList.map((ele, index) => (
              <LegendItem color={levelColors[index]} key={ele}>
                <span>{TEXT[ele]}</span>
              </LegendItem>
            ))}
          </Legend>
          <Chart getOptions={this.getLevelOptions} data={this.levelData} />
        </BlockArea>
      </>
    );
  }
}

export default TimeDetail;
