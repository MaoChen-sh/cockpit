import React, { PureComponent } from "react";
import { Chart, BlockArea, Rate } from "components";
import { TableTemp as Table, HeaderTemp } from "view/components";
import { $fetch, apis } from "config";
import fakeData from "config/fakeData";
import { IN, ENTER, LEAVE } from "./TYPES";
import echarts from "echarts/lib/echarts";
import { getYMD } from "tools";
const oneDay = 24 * 3600 * 1000;

class Hospital extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      countListSort: "down", // 列表按数据排序分布
      rateListSort: "none", // 列表按环比排序分布
      dataType: "area",
      inHospital: 0, // 在院人数
      death: 0, // 在院死亡人数
      icu: 0, // 监护室人数
      listIn: [], // 在院人数列表

      leaveHospital: 0, // 出院人数
      autoLeave: 0, // 自动出院人数
      listLeave: [], // 出院人数列表

      enterHospital: 0, // 入院人数
      listEnter: [] // 入院人数列表
    };
  }
  get TYPE() {
    const {
      params: { type }
    } = this.props.match;
    switch (type) {
      case "in":
        return IN;
      case "enter":
        return ENTER;
      case "leave":
        return LEAVE;
      default:
        throw new Error(
          "router error , pleace check your match's type ; 路由错误 请检测你的 :type 设置"
        );
    }
  }
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

  get columns() {
    const { countListSort, rateListSort } = this.state;
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
          title: "人数",
          sort: countListSort,
          onSort: this.onCountListSort,
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
        sort: rateListSort,
        onSort: this.onRateListSort,
        render: ele => <Rate value={ele.rate} />,
        id: 1
      },
      {
        title: "人数",
        sort: countListSort,
        onSort: this.onCountListSort,
        render: ele => ele.value,
        id: 2
      }
    ];
  }

  get listData() {
    const { countListSort, dataType, rateListSort } = this.state;
    const dataArr = fakeData[dataType].map(ele => ({
      ...ele,
      to: "/"
    }));
    if (countListSort !== "none") {
      return dataArr.sort(
        (a, b) => (countListSort === "down" ? -1 : 1) * (a.value - b.value)
      );
    }
    if (rateListSort !== "none") {
      return dataArr.sort(
        (a, b) => (rateListSort === "down" ? -1 : 1) * (a.rate - b.rate)
      );
    }
    return dataArr;
  }

  get chartData() {
    return this.TYPE.getChartData(this.state);
  }

  componentDidMount() {
    this.get_data(this.beginDate, this.endDate);
  }

  get_data = (...args) => {
    this.get_inhospital(...args);
    if (this.type !== "day") {
      this.get_department_distribution(...args);
    }
  };
  get_inhospital = (beginDate, endDate) => {
    $fetch
      .get(apis.overall.hospitalized, {
        params: {
          beginDate,
          endDate
        }
      })
      .then(res => {
        const { result } = res;
        if (result) {
          const {
            hospitalizedPatients,
            outHospital,
            inHospital,
            inHospitalDeath,
            autoOutHospital,
            icu
          } = result;
          this.setState({
            inHospital: hospitalizedPatients.totalInHospital,
            death: inHospitalDeath.inHospitalDeath,
            icu: icu.icu,

            leaveHospital: outHospital.recover,
            autoLeave: autoOutHospital.outHospitalAuto,

            enterHospital: inHospital.admissions
          });
        }
      });
  };

  get_department_distribution = (beginDate, endDate) => {
    $fetch
      .get(apis.hospitalization.department_distribution, {
        params: {
          beginDate,
          endDate
        }
      })
      .then(res => {
        const { result } = res;
        if (result) {
          const { inOutHospital } = result;
          this.setState({
            listIn: inOutHospital.totalInHospital,
            listEnter: inOutHospital.admissions,
            listLeave: inOutHospital.recover
          });
        }
      });
  };

  onCountListSort = () => {
    this.setState({
      countListSort: this.state.countListSort === "down" ? "up" : "down",
      rateListSort: "none"
    });
  };
  onRateListSort = () => {
    this.setState({
      countListSort: "none",
      rateListSort: this.state.rateListSort === "down" ? "up" : "down"
    });
  };
  onOptionChange = val => {
    this.setState({
      dataType: val === "科室" ? "class" : "area"
    });
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
  render() {
    return (
      <div>
        <HeaderTemp {...this.TYPE.getHeaderProps(this.state)} />
        {this.type !== "day" && (
          <BlockArea
            {...this.TYPE.getChartAreaProps()}
            defaultStyles={`height: 150px;padding: 14px 0`}
          >
            <Chart getOptions={this.getOptions} data={this.chartData} />
          </BlockArea>
        )}
        <BlockArea {...this.TYPE.getListAreaProps()}>
          <Table data={this.listData} columns={this.columns} />
        </BlockArea>
      </div>
    );
  }
}

export default Hospital;
