import React, { PureComponent } from "react";
import { Chart as ChartBase, BlockArea } from "components";
import styled from "styled-components";
import echarts from "echarts/lib/echarts";
import { $fetch, apis } from "config";
import { ListTemp, HeaderTemp } from "view/Cockpit/components";
const Chart = styled(ChartBase)`
  height: 150px;
`;
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
  componentDidMount() {}

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
            outpatientData: result.outpatientEmergencyList.slice(8, 18),
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
      outpatientData,
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
              grid: {
                left: "24px",
                right: "0",
                top: "20px",
                bottom: "16px"
              },
              xAxis: {
                type: "category",
                axisTick: {
                  show: false
                },
                data: Array(10)
                  .fill("")
                  .map((ele, index) => index + 9),
                min: 0,
                axisLine: {
                  lineStyle: {
                    color: " #ddd"
                  }
                },
                axisLabel: {
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
                  data: outpatientData,
                  type: "line",
                  symbol: "circle",
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
