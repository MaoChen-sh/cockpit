import React, { PureComponent } from "react";
import {
  Header,
  Chart as ChartBase,
  BlockArea,
  List,
  RightArrow
} from "components";
import styled from "styled-components";
import echarts from "echarts/lib/echarts";
import { $fetch, apis } from "config";

const HeaderContent = styled.div`
  color: #fff;
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 16px;
  line-height: 1;
  h3,
  h4 {
    font-size: 12px;
    opacity: 0.8;
    margin-bottom: 6px;
  }
  p {
    font-size: 32px;
  }
  ul {
    display: flex;
    justify-content: center;
    margin-top: 14px;
    li {
      &:first-child {
        padding-right: 50px;
      }
      &:last-child {
        position: relative;
        padding-left: 50px;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          height: 26px;
          width: 2px;
          background: #fff;
          opacity: 0.8;
          display: block;
          transform: translate(-50%, -50%);
        }
      }
    }
    p {
      font-size: 18px;
    }
  }
`;
const Chart = styled(ChartBase)`
  height: 150px;
`;
const CountItem = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
  align-items: center;
  padding-left: 20px;
  padding-right: 10px;
  font-size: 14px;
  line-height: 1;
  justify-content: space-between;
  span {
    color: #333;
    &:first-child {
      color: #4a4a4a;
    }
    &:last-child {
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
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
        <Header>
          <HeaderContent>
            <h3>门急诊人次</h3>
            <p>{total}</p>
            <ul>
              {[
                {
                  title: "门诊人次",
                  count: outpatient
                },
                {
                  title: "急诊人次",
                  count: emergency
                }
              ].map((ele, index) => (
                <li key={index}>
                  <h4>{ele.title}</h4>
                  <p>{ele.count}</p>
                </li>
              ))}
            </ul>
          </HeaderContent>
        </Header>
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
          <List
            defaultStyles={`.list-title{padding-right: 42px}`}
            title={[
              <div key={0}>科室</div>,
              <div
                className={`list_title--sort ${countListUp ? "up" : "down"}`}
                key={1}
                onClick={this.onCountListSort}
              >
                门诊人次
              </div>
            ]}
            list={distributionList
              .sort(
                (a, b) =>
                  (countListUp ? -1 : 1) *
                  (a.outpatientEmergencyRegistration -
                    b.outpatientEmergencyRegistration)
              )
              .map(ele => {
                const {
                  departmentName: name,
                  outpatientEmergencyRegistration: count
                } = ele;
                return {
                  content: (
                    <CountItem>
                      <span>{name}</span>
                      <span>
                        {count} <RightArrow shadow={false} />
                      </span>
                    </CountItem>
                  )
                };
              })}
          />
        </BlockArea>
      </div>
    );
  }
}

export default Outpatient;
