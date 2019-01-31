import React, { PureComponent } from "react";
import { Chart, BlockArea, RightArrow, Rate } from "components";
import styled from "styled-components";
import { $fetch, apis } from "config";
import { random, getYMD } from "tools";
import echarts from "echarts/lib/echarts";
import { Link } from "react-router-dom";
import { TableTemp as Table, HeaderTemp } from "view/components";
import fakeData from "config/fakeData";
const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  & > li {
    width: 33%;
    text-align: center;
    & > a > * {
      padding-top: 5px;
      padding-bottom: 5px;
      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
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
const colors = ["#32d9c1", "#ffc75b", "#f88287", "#24b1f3"];
const oneDay = 24 * 3600 * 1000;
class Surgery extends PureComponent {
  state = {
    total: 0, // 总手数台数
    diffLevelSurgery: {}, // 不同级别手术信息
    diffTypeSurgery: {}, // 不同类别手术信息
    dataType: "area"
  };
  get type() {
    const {
      location: { search }
    } = this.props;
    return search.match(/type=(\w+)/)[1];
  }
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

  get navListData() {
    const { diffTypeSurgery } = this.state;
    return [
      {
        title: "门诊手术",
        ...diffTypeSurgery.outpatient,
        to: {
          pathname: "/cockpit/surgery/typedetail",
          state: { title: "门诊手术" }
        }
      },
      {
        title: "择期手术",
        ...diffTypeSurgery.elective,
        to: {
          pathname: "/cockpit/surgery/typedetail",
          state: { title: "择期手术" }
        }
      },
      {
        title: "急诊手术",
        ...diffTypeSurgery.emergency,
        to: {
          pathname: "/cockpit/surgery/typedetail",
          state: { title: "急诊手术" }
        }
      }
    ];
  }
  get chartData() {
    const { diffLevelSurgery } = this.state;
    return [
      { value: diffLevelSurgery.first, name: "一类手术" },
      { value: diffLevelSurgery.second, name: "二类手术" },
      { value: diffLevelSurgery.third, name: "三类手术" },
      { value: diffLevelSurgery.fourthAbove, name: "四类和特类手术" }
    ];
  }

  get columns() {
    if (this.type === "day") {
      return [
        {
          title: "病区",
          options: ["病区", "科室"],
          onChange: this.onOptionChange,
          render: ele => ele.name,
          id: 0
        },
        {
          title: "手术例数",
          sortKey: "value",
          render: ele => ele.value,
          id: 1
        }
      ];
    }
    return [
      {
        title: "病区",
        options: ["病区", "科室"],
        onChange: this.onOptionChange,
        render: ele => ele.name,
        id: 0
      },
      {
        title: "环比数据",
        sortKey: "rate",
        render: ele => <Rate value={ele.rate} />,
        id: 1
      },
      {
        title: "手术例数",
        sortKey: "value",
        render: ele => ele.value,
        id: 2
      }
    ];
  }
  get listData() {
    const { dataType } = this.state;
    const dataArr = fakeData[dataType].map((ele, index) => ({
      ...ele,
      rate: Math.random(),
      to: {
        pathname: "/cockpit/surgery/detail",
        state: { title: ele.name }
      },
      id: index
    }));

    return dataArr;
  }

  componentDidMount() {
    this.get_surgery(this.beginDate, this.endDate);
  }

  getValueRate = (obj, valueKey, rateKey) => {
    return obj
      ? {
          value: obj[valueKey],
          rate: obj[rateKey]
        }
      : {};
  };

  get_surgery = (beginDate, endDate) => {
    const { getValueRate } = this;
    $fetch
      .get(apis.overall.surgery, {
        params: {
          beginDate,
          endDate
        }
      })
      .then(result => {
        const { surgery, surgeryLevel, surgeryType } = result;
        this.setState({
          total: surgery.totalSurgery,
          diffLevelSurgery: {
            first: surgeryLevel.oneTypeSurgeryCount,
            second: surgeryLevel.twoTypeSurgeryCount,
            third: surgeryLevel.threeTypeSurgeryCount,
            fourthAbove:
              surgeryLevel.fourTypeSurgeryCount +
              surgeryLevel.specialSurgeryCount
          },
          diffTypeSurgery: {
            outpatient: getValueRate(
              surgeryType,
              "emerSurgeryCount",
              "emerSurgeryRate"
            ), // 门诊
            elective: getValueRate(
              surgeryType,
              "electiveSurgeryCount",
              "electiveSurgeryRate"
            ), // 择期
            emergency: getValueRate(
              surgeryType,
              "emerSurgeryCount",
              "emerSurgeryRate"
            ) // 急诊
          }
        });
      });
  };

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

  onOptionChange = val => {
    this.setState({
      dataType: val === "科室" ? "class" : "area"
    });
  };

  get timeChartData() {
    // const { outpatientData } = this.state;
    return Array(31)
      .fill(0)
      .map(() => random(0, 120));
  }
  getTimeChartOptions = data => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            type: "dotted",
            color: "#F2B241"
          }
        },
        backgroundColor: "#FF931E",
        formatter: "{c0}<br /><span style='font-size: 9px'>{b0}</span>",
        textStyle: {
          fontSize: 10
        }
      },
      grid: {
        left: "30px",
        right: "20px",
        top: "20px",
        bottom: "16px"
      },
      xAxis: {
        type: "category",
        axisTick: {
          show: false
        },
        data: data.map((ele, index) =>
          getYMD(new Date(new Date(this.beginDate).valueOf() + oneDay * index))
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
          interval: data.length - 2,
          margin: 4,
          color: "#666",
          fontSize: 10
        }
      },
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
          data: data,
          type: "line",
          showSymbol: false,
          symbol: "emptyCircle",
          symbolSize: 6,
          label: {
            show: true,
            distance: 4,
            color: "#ff9405",
            fontSize: 9
          },
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
          lineStyle: {
            color: "#F2B241",
            width: 1
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "rgba(255,141,22,1)"
              },
              {
                offset: 1,
                color: "rgba(255,170,55,1)"
              }
            ])
          }
        }
      ]
    };
  };
  render() {
    const { total, dataType } = this.state;
    return (
      <div>
        <HeaderTemp small title={"手术台数"} count={total} />
        {this.type !== "day" && (
          <BlockArea
            to={"/cockpit/surgery/timedetail" + this.props.location.search}
            title={"本月每日手术台数"}
            defaultStyles={`padding: 14px 0`}
          >
            <Chart
              getOptions={this.getTimeChartOptions}
              data={this.timeChartData}
            />
          </BlockArea>
        )}

        <BlockArea title={"不同类别的手术台数"}>
          <NavList>
            {this.navListData.map((ele, index) => (
              <li key={index}>
                <Link to={ele.to}>
                  <h4>{ele.title}</h4>
                  {this.type !== "day" && <Rate value={ele.rate} />}
                  <p>
                    <span>{ele.value}</span>
                    <RightArrow />
                  </p>
                </Link>
              </li>
            ))}
          </NavList>
        </BlockArea>

        <BlockArea title={"不同级别手术台数"} to={"/cockpit/surgery/leveldetail"}>
          <Chart
            defaultStyles={`height: 120px;`}
            getOptions={this.getOptions}
            data={this.chartData}
          />
          <Legend>
            {this.chartData.map((ele, index) => (
              <LegendItem color={colors[index]} key={index}>
                <span>{ele.name}</span>
                <span>{ele.value}</span>
              </LegendItem>
            ))}
          </Legend>
        </BlockArea>
        <BlockArea
          title={"不同" + (dataType === "class" ? "科室" : "病区") + "手术例数"}
        >
          <Table data={this.listData} columns={this.columns} />
        </BlockArea>
      </div>
    );
  }
}

export default Surgery;
