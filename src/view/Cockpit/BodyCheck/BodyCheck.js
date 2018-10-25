import React, { PureComponent } from "react";
import { Header, Chart, BlockArea, RightArrow } from "components";
import styled from "styled-components";
import { $fetch, apis } from "config";

const HeaderContent = styled.div`
  color: #fff;
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 16px;
  line-height: 1;
  h3 {
    font-size: 12px;
    opacity: 0.8;
    margin-bottom: 6px;
  }
  p {
    font-size: 32px;
  }
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  & > li {
    width: 33%;
    height: 42px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
class BodyCheck extends PureComponent {
  constructor(props) {
    super(props);
    const {
      location: { search }
    } = props;
    this.get_data(...search.match(/\d+.\d+.\d+/g));

    this.state = {
      total: "", // 总数
      teamCount: "", // 团队数
      singleCount: "" // 个体数
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
      .then(res => {
        const { result } = res;
        if (result) {
          const { medicalExamination: obj } = result;
          this.setState({
            total: obj.medicalExamination,
            teamCount: obj.examinationGroup,
            singleCount: obj.examinationIndividual
          });
        }
      })
      .catch(err => console.error(err));
  };
  render() {
    const colors = ["#ffc75b", "#23D7BD"];
    const { total, teamCount, singleCount } = this.state;
    const dataList = [
      {
        title: "团队体检人数",
        count: teamCount,
        to: "/cockpit/outpatient"
      },
      {
        title: "散客体检人数",
        count: singleCount,
        to: "/cockpit/surgery"
      }
    ];
    const canvasData = dataList.map(ele => ({
      value: ele.count,
      name: ele.title
    }));
    return (
      <div>
        <Header defaultStyles={`margin-top: -66px; padding-top: 66px;`}>
          <HeaderContent>
            <h3>体检人数</h3>
            <p>{total}</p>
          </HeaderContent>
        </Header>
        <BlockArea title={"不同类型的体检人数"}>
          <NavList>
            {dataList.map((ele, index) => (
              <li key={index}>
                <h4>{ele.title}</h4>
                <p>
                  <span>{ele.count}</span>
                  <RightArrow />
                </p>
              </li>
            ))}
          </NavList>
        </BlockArea>
        <BlockArea title={"不同类型体检人数占比"}>
          <Chart
            defaultStyles={`height: 120px;`}
            options={{
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
                  data: canvasData
                }
              ]
            }}
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
