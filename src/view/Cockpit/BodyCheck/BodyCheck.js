import React, { PureComponent } from "react";
import { Chart, BlockArea, RightArrow, Rate } from "components";
import styled from "styled-components";
import { $fetch, apis } from "config";
import { HeaderTemp } from "view/components";
import { Link } from "react-router-dom";

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  & > li {
    width: 50%;
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
const colors = ["#ffc75b", "#23D7BD"];

class BodyCheck extends PureComponent {
  constructor(props) {
    super(props);
    const {
      location: { search }
    } = props;
    this.get_data(...search.match(/\d+.\d+.\d+/g));
    this.type = search.match(/type=(\w+)/)[1];
    this.state = {
      total: "", // 总数
      teamCount: "", // 团队数
      teamRate: "", // 团队增长率
      singleCount: "", // 个体数
      singleRate: "" // 个体增长率
    };
  }

  get_data = (...args) => {
    this.get_medical_examination(...args); // 体检人数
  };
  get_medical_examination = (beginDate, endDate) => {
    $fetch
      .get(apis.overall.medical_examination, {
        params: {
          beginDate,
          endDate
        }
      })
      .then(result => {
        const { medicalExamination: obj } = result;
        this.setState({
          total: obj ? obj.medicalExamination : 0,
          teamCount: obj ? obj.examinationGroup : 0,
          teamRate: obj ? obj.groupExaminationRate : 0,
          singleCount: obj ? obj.examinationIndividual : 0,
          singleRate: obj ? obj.medicalExaminationRate : 0
        });
      })
      .catch(err => console.error(err));
  };
  get dataList() {
    const { teamCount, teamRate, singleCount, singleRate } = this.state;
    return [
      {
        title: "团队体检人数",
        count: teamCount,
        rate: teamRate,
        to: {
          pathname: "/cockpit/bodycheck/countdetail",
          state: { type: "team" }
        }
      },
      {
        title: "散客体检人数",
        count: singleCount,
        rate: singleRate,
        to: {
          pathname: "/cockpit/bodycheck/countdetail",
          state: { type: "single" }
        }
      }
    ];
  }
  getOptions = data => {
    return {
      color: colors,
      series: [
        {
          type: "pie",
          radius: "90%",
          center: ["50%", "50%"],
          selectedMode: "single",
          roseType: "radius",
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
  render() {
    const { total } = this.state;
    const canvasData = this.dataList.map(ele => ({
      value: ele.count,
      name: ele.title
    }));
    return (
      <div>
        <HeaderTemp small title={"体检人数"} count={total} />
        <BlockArea title={"不同类型的体检人数"}>
          <NavList>
            {this.dataList.map((ele, index) => (
              <li key={index}>
                <Link to={ele.to}>
                  <h4>{ele.title}</h4>
                  {this.type !== "day" && <Rate value={ele.rate || null} />}
                  <p>
                    <span>{ele.count}</span>
                    <RightArrow />
                  </p>
                </Link>
              </li>
            ))}
          </NavList>
        </BlockArea>
        <BlockArea
          title={"不同类型体检人数占比"}
          to={"/cockpit/bodycheck/ratedetail"}
        >
          <Chart
            defaultStyles={`height: 120px;`}
            data={canvasData}
            getOptions={this.getOptions}
          />
          <Legend>
            {canvasData.map((ele, index) => (
              <LegendItem key={index} color={colors[index]}>
                <span>{ele.name}</span>
                <span>{ele.value}</span>
              </LegendItem>
            ))}
          </Legend>
        </BlockArea>
      </div>
    );
  }
}

export default BodyCheck;
