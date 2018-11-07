import React, { PureComponent } from "react";
import { Chart as ChartBase, BlockArea } from "components";
import styled from "styled-components";
import echarts from "echarts/lib/echarts";
import { $fetch, apis } from "config";
import { getYMD } from "tools";
import { ListTemp, HeaderTemp, TableTemp as Table } from "view/Cockpit/components";
const Chart = styled(ChartBase)`
  height: 150px;
`;
const oneDay = 24 * 3600 * 1000;
class Outpatient extends PureComponent {
  constructor(props) {
    super(props);
    const {
      location: { search }
    } = props;
    this.get_data(...search.match(/\d+.\d+.\d+/g));
    this.state = {
      total: 0, // 门急诊量
      outpatient: 0, //门急诊量
      emergency: 0, // 急诊量
      outpatientData: [], // 时段数据
      distributionList: [], // 部门分布列表
      countListUp: true // 列表降序分布
    };
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
  get dataList() {
    const { outpatientData } = this.state;
    return this.type === "day" ? outpatientData.slice(8, 18) : outpatientData;
  }
  get type() {
    const {
      location: { search }
    } = this.props;
    const [beginDate, endDate] = [
      search.match(/beginDate=([\d-]+)/)[1],
      search.match(/endDate=([\d-]+)/)[1]
    ];
    const reduce = new Date(endDate).valueOf() - new Date(beginDate).valueOf();
    if (reduce > oneDay * 60) {
      return "year";
    }
    if (reduce > oneDay * 15) {
      return "month";
    }
    return "day";
  }

  get_data = (...args) => {
    this.get_outpatient(...args); // 门诊量时段分布
    this.get_department_distribution(...args); // 门诊量科室分布
  };

  // 门诊量时段分布
  get_outpatient = (beginDate, endDate) => {
    $fetch
      .get(apis.overall.outpatient, {
        params: {
          beginDate,
          endDate
        }
      })
      .then(res => {
        const { result } = res;
        if (result) {
          this.setState({
            outpatientData: result.outpatientEmergencyList,
            total: result.outpatientEmergency.totalOutpatientEmergency,
            outpatient: result.outpatient.totalOutpatient,
            emergency: result.emergency.totalEmergency
          });
        }
      })
      .catch(err => console.error(err));
  };

  // 门诊量科室分布
  get_department_distribution = (beginDate, endDate) => {
    $fetch
      .get(apis.emergency.department_distribution, {
        params: {
          beginDate,
          endDate
        }
      })
      .then(res => {
        // countList
        const { result } = res;
        if (result && result.emergencyDepartTop) {
          this.setState({
            distributionList: result.emergencyDepartTop // {departmentName: <str>, outpatientEmergencyRegistration: <number>}
          });
        }
      })
      .catch(err => console.error(err));
  };

  onCountListSort = () => {
    this.setState({
      countListUp: !this.state.countListUp
    });
  };
  render() {
    const {
      distributionList,
      countListUp,
      total,
      outpatient,
      emergency
    } = this.state;
    return (
      <div>
        <HeaderTemp
          title={"门急诊人次"}
          count={total}
          subList={[
            {
              title: "门诊人次",
              count: outpatient
            },
            {
              title: "急诊人次",
              count: emergency
            }
          ]}
        />
        <BlockArea
          title={"不同时段门急诊人次"}
          defaultStyles={`padding: 14px 0`}
        >
          <Chart
            options={{
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
                data:
                  this.type === "day"
                    ? this.dataList.map((ele, index) => index + 9)
                    : this.dataList.map((ele, index) =>
                        getYMD(
                          new Date(
                            new Date(this.beginDate).valueOf() + oneDay * index
                          )
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
                  interval: this.type === "day" ? 0 : this.dataList.length - 2,
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
                  data: this.dataList,
                  type: "line",
                  showSymbol: this.type === "day",
                  symbol: this.type === "day" ? "circle" : "emptyCircle",
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
            }}
          />
        </BlockArea>
        <BlockArea title={"不同科室门急诊人次"}>
          <Table
            data={distributionList
              .map((ele, index) => ({
                name: ele.departmentName,
                value: ele.outpatientEmergencyRegistration,
                to: "/",
                id: index
              }))
              .sort((a, b) => (countListUp ? -1 : 1) * (a.value - b.value))}
            columns={[
              {
                title: "科室",
                render: ele => ele.name,
                id: 0
              },
              {
                title: "门诊人次",
                sort: countListUp ? "up" : "down",
                onSort: this.onCountListSort,
                render: ele => ele.value,
                id: 1
              }
            ]}
          />
          <ListTemp
            title={[
              "科室",
              {
                content: "门诊人次",
                sort: countListUp ? "up" : "down",
                onSort: this.onCountListSort
              }
            ]}
            list={distributionList
              .map(ele => ({
                name: ele.departmentName,
                value: ele.outpatientEmergencyRegistration,
                to: "/"
              }))
              .sort((a, b) => (countListUp ? -1 : 1) * (a.value - b.value))}
          />
        </BlockArea>
      </div>
    );
  }
}

export default Outpatient;
