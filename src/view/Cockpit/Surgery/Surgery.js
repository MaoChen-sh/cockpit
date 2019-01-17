import React, { PureComponent } from "react";
import { Chart, BlockArea, RightArrow, Rate as RateBase } from "components";
import styled from "styled-components";
import { $fetch, apis } from "config";
import { TableTemp as Table, HeaderTemp } from "view/components";
import fakeData from "config/fakeData";
const Rate = styled(RateBase)``;
const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  & > li {
    width: 33%;
    text-align: center;
    & > * {
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

class Surgery extends PureComponent {
  state = {
    total: 0, // 总手数台数
    diffLevelSurgery: {}, // 不同级别手术信息
    diffTypeSurgery: {}, // 不同类别手术信息
    dataType: "area",
    countListSort: "down", // 列表按数据排序分布
    rateListSort: "none" // 列表按环比排序分布
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
        to: "/cockpit/outpatient"
      },
      {
        title: "择期手术",
        ...diffTypeSurgery.elective,
        to: "/cockpit/surgery"
      },
      {
        title: "急诊手术",
        ...diffTypeSurgery.emergency,
        to: ""
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
          title: "手术例数",
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
        title: "手术例数",
        sort: countListSort,
        onSort: this.onCountListSort,
        render: ele => ele.value,
        id: 2
      }
    ];
  }
  get listData() {
    const { dataType, countListSort, rateListSort } = this.state;
    const dataArr = fakeData[dataType].map((ele, index) => ({
      ...ele,
      rate: Math.random(),
      to: "/",
      id: index
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
  render() {
    const { total } = this.state;
    return (
      <div>
        <HeaderTemp small title={"手术台数"} count={total} />
        <BlockArea title={"不同类别的手术台数"}>
          <NavList>
            {this.navListData.map((ele, index) => (
              <li key={index}>
                <h4>{ele.title}</h4>
                {this.type !== "day" && <Rate value={ele.rate} />}
                <p>
                  <span>{ele.value}</span>
                  <RightArrow />
                </p>
              </li>
            ))}
          </NavList>
        </BlockArea>
        <BlockArea title={"不同级别手术台数"}>
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
        <BlockArea title={"不同科室手术例数"}>
          <Table data={this.listData} columns={this.columns} />
        </BlockArea>
      </div>
    );
  }
}

export default Surgery;
