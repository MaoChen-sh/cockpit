import React, { PureComponent } from "react";
import { Chart, BlockArea, Rate } from "components";
import { TableTemp as Table, HeaderTemp } from "view/components";
// import { $fetch, apis } from "config";
import echarts from "echarts/lib/echarts";
import { getMoney } from "tools";
import { getYMD } from "tools";
const oneDay = 24 * 3600 * 1000;

const fakeData = [
  {
    name: "妇产科",
  },
  {
    name: "消化内科",
  },
  {
    name: "耳鼻喉科",
  },
  {
    name: "神经外科",
  },
  {
    name: "骨科",
  },
  {
    name: "肿瘤科",
  },
  {
    name: "产科",
  },
  {
    name: "肝脏移植科",
  },
  {
    name: "血液科",
  }
].map(ele=>({...ele, 
  value: parseInt(Math.random()*100000),
  rate: Math.random()-0.5
}));
const fakeChartData = Array(31).fill('').map(ele=> parseInt(Math.random()*1000000))
class Income extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      countListSort: "down", // 列表按数据排序分布
      rateListSort: "none" // 列表按环比排序分布
    };
  }
  strObj = {
    total: "医疗总收入",
    uninhospital: "门急诊收入",
    inhospital: "住院收入",
    nondrug: "非药品收入",
    drug: "药品收入"
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
  get columns() {
    const { countListSort, rateListSort } = this.state;
    const {
      match: {
        params: { type }
      }
    } = this.props;
    const str = this.strObj[type];
    if (this.type === "day") {
      return [
        {
          title: "科室",
          render: ele => ele.name,
          id: 0
        },
        {
          title: str,
          sort: countListSort,
          onSort: this.onCountListSort,
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
        sort: rateListSort,
        onSort: this.onRateListSort,
        render: ele => <Rate value={ele.rate} />,
        id: 1
      },
      {
        title: str,
        sort: countListSort,
        onSort: this.onCountListSort,
        render: ele => ele.value,
        id: 2
      }
    ];
  }
  get listData() {
    const { countListSort, rateListSort } = this.state;
    const dataArr = fakeData;
    if (countListSort !== "none") {
      return dataArr
        .sort(
          (a, b) => (countListSort === "down" ? -1 : 1) * (a.value - b.value)
        )
        .map(ele => ({
          ...ele,
          value: getMoney(ele.value),
          to: "/"
        }));
    }
    if (rateListSort !== "none") {
      return dataArr
        .sort((a, b) => (rateListSort === "down" ? -1 : 1) * (a.rate - b.rate))
        .map(ele => ({
          ...ele,
          value: getMoney(ele.value),
          to: "/"
        }));
    }
    return dataArr.map(ele => ({
      ...ele,
      value: getMoney(ele.value),
      to: "/"
    }));
  }
  get chartData() {
    return fakeChartData;
  }
  onCountListSort = () => {
    this.setState({
      countListUp: !this.state.countListUp
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
        formatter: params=>{
          const  {axisValue, value}=  params[0]
        return `${getMoney(value)}<br /><span style='font-size: 9px'>${axisValue}</span>`
        },
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
          fontSize: 10,
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
          fontSize: 10,
          formatter: value=> parseInt(value/10000)+'w'
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
  render() {
    const {
      match: {
        params: { type }
      }
    } = this.props;
    const str = this.strObj[type];
    return (
      <div>
        <HeaderTemp small title={str} count={getMoney(1800800)} />
        {this.type !== "day" && (
          <BlockArea
            title={`本月每天的${str}`}
            defaultStyles={`height: 150px;padding: 14px 0`}
          >
            <Chart getOptions={this.getOptions} data={this.chartData} />
          </BlockArea>
        )}

        <BlockArea title={`不同科室的${str}`}>
          <Table data={this.listData} columns={this.columns} />
        </BlockArea>
      </div>
    );
  }
}

Income.propTypes = {};

export default Income;
