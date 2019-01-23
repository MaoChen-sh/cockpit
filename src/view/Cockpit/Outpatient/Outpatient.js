import React, { PureComponent } from "react";
import { Chart as ChartBase, BlockArea, Rate, RightArrow } from "components";
import { Link } from "react-router-dom";
import styled from "styled-components";
import echarts from "echarts/lib/echarts";
import { $fetch, apis } from "config";
import { getYMD } from "tools";
import { HeaderTemp, TableTemp as Table } from "view/components";
const AreaTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    margin-left: 10px;
  }
`;
const Area = styled.div`
  display: flex;
`;
const AreaItem = styled.div`
  width: 50%;
  border-right: 1px dashed #c6c6c6;

  &:last-child {
    border: none;
  }
  h6 {
    font-size: 12px;
    color: #6b6b6b;
    text-align: center;
  }
  p {
    margin-top: 10px;
    font-size: 16px;
    color: #333;
    text-align: center;
  }
`;
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
      distributionList: [] // 部门分布列表
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
  get chartData() {
    const { outpatientData } = this.state;
    return this.type === "day" ? outpatientData.slice(8, 18) : outpatientData;
  }
  get type() {
    const {
      location: { search }
    } = this.props;
    return search.match(/type=(\w+)/)[1];
  }

  get columns() {
    if (this.type === "day") {
      return [
        {
          title: "科室",
          render: ele => ele.name,
          id: 0
        },
        {
          title: "门诊人次",
          sortKey: "value",
          render: ele => ele.value,
          id: 1
        }
      ];
    }
    return [
      {
        title: "科室",
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
        title: "门诊人次",
        sortKey: "value",
        render: ele => ele.value,
        id: 2
      }
    ];
  }
  get listData() {
    const { distributionList } = this.state;
    const dataArr = distributionList.map((ele, index) => ({
      name: ele.departmentName,
      value: ele.outpatientEmergencyRegistration,
      rate: ele.ringRate,
      to: {
        pathname: "/cockpit/outpatient/detail",
        state: { title: ele.departmentName }
      },
      id: index
    }));

    return dataArr;
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
      .then(result => {
        this.setState({
          outpatientData: result.outpatientEmergencyList,
          total: result.outpatientEmergency.totalOutpatientEmergency,
          outpatient: result.outpatient.totalOutpatient,
          emergency: result.emergency.totalEmergency
        });
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
      .then(result => {
        if (result && result.emergencyDepartTop) {
          this.setState({
            distributionList: result.emergencyDepartTop
          });
        }
      })
      .catch(err => console.error(err));
  };

  getOptions = data => {
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
        data:
          this.type === "day"
            ? data.map((ele, index) => index + 9)
            : data.map((ele, index) =>
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
          interval: this.type === "day" ? 0 : data.length - 2,
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
    };
  };
  gotoTimeDetail = e => {
    if (e.target.tagName.toUpperCase() === "CANVAS") {
      return;
    }
    this.props.history.push("/cockpit/outpatient/timedetail");
  };
  render() {
    const { total, outpatient, emergency } = this.state;
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
          onClick={this.gotoTimeDetail}
          title={"不同时段门急诊人次"}
          defaultStyles={`padding: 14px 0`}
        >
          <Chart getOptions={this.getOptions} data={this.chartData} />
        </BlockArea>
        <Link to={"/cockpit/map"}>
          <BlockArea
            title={
              <AreaTitle>
                不同科室门急诊人次 <RightArrow />
              </AreaTitle>
            }
          >
            <Area>
              {[
                {
                  title: "范围内门急诊人次",
                  count: Math.ceil(Math.random() * 300 + 200)
                },
                {
                  title: "范围外门急诊人次",
                  count: Math.ceil(Math.random() * 300 + 200)
                }
              ].map((ele, index) => (
                <AreaItem key={index}>
                  <h6>{ele.title}</h6>
                  <p>{ele.count}</p>
                </AreaItem>
              ))}
            </Area>
          </BlockArea>
        </Link>

        <BlockArea title={"不同科室门急诊人次"}>
          <Table data={this.listData} columns={this.columns} />
        </BlockArea>
      </div>
    );
  }
}

export default Outpatient;
