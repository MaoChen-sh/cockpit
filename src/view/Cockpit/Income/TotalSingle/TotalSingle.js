import React, { PureComponent } from "react";
import { BlockArea, Chart, Rate } from "components";
import styled from "styled-components";
import { LinkList } from "view/components";
import { getMoney, random } from "tools";
const colors = ["#3bd6ba", "#5fbaf9", "#efefef"];
const ChartItem = styled.div`
  width: 50%;
  text-align: center;
  display: inline-block;
`;
const ChartTitle = styled.div`
  font-size: 14px;
  color: #4a4a4a;
  margin-bottom: 10px;
`;

class TotalSingle extends PureComponent {
  list = [
    {
      content: "医疗收入(不含药品)",
      value: getMoney(random(10000, 100000)),
      rate: random(-1, 1)
    },
    {
      content: "门急诊收入(不含体检)",
      value: getMoney(random(10000, 100000)),
      rate: random(-1, 1)
    },
    {
      content: "卫生材料费用",
      value: getMoney(random(10000, 100000)),
      rate: random(-1, 1)
    },
    {
      content: "检查化验收入",
      value: getMoney(random(10000, 100000)),
      rate: random(-1, 1)
    },
    {
      content: "医保收入",
      value: getMoney(random(10000, 100000)),
      rate: random(-1, 1)
    },
    {
      content: "药品收入(按照病种收费的病种数)",
      value: getMoney(random(10000, 100000)),
      rate: random(-1, 1)
    },
    {
      content: "按照病种收费的病种数",
      value: random(10000, 100000),
      rate: random(-1, 1)
    },
    {
      content: "医疗服务收入(不含药品、卫生材料、检查化验)",
      value: getMoney(random(10000, 100000)),
      rate: random(-1, 1)
    }
  ];
  getNonDrugOptions = data => ({
    color: [colors[1], colors[2]],
    series: [
      {
        type: "pie",
        radius: ["50%", "90%"],
        center: ["50%", "50%"],
        selectedMode: "single",
        data: data
      }
    ]
  });
  getDrugOptions = data => ({
    color: [colors[0], colors[2]],
    series: [
      {
        type: "pie",
        radius: ["50%", "90%"],
        center: ["50%", "50%"],
        selectedMode: "single",
        data: data
      }
    ]
  });
  get nonDrugChartData() {
    return [
      {
        value: random(0, 1, 2),
        label: {
          formatter: `{d}%`,
          position: "center",
          color: colors[1],
          fontSize: "12px"
        }
      },
      {
        value: random(0, 1, 2),
        label: false,
        labelLine: {
          show: false
        }
      }
    ];
  }
  get drugChartData() {
    return [
      {
        value: random(0, 1, 2),
        label: {
          formatter: `{d}%`,
          position: "center",
          color: colors[0],
          fontSize: "12px"
        }
      },
      {
        value: random(0, 1, 2),
        label: false,
        labelLine: {
          show: false
        }
      }
    ];
  }
  render() {
    return (
      <>
        <BlockArea>
          <ChartItem>
            <ChartTitle>四项比</ChartTitle>
            <Rate value={random(-1,1,2)} />
            <Chart
              defaultStyles={`height: 120px; margin-top:18px`}
              getOptions={this.getNonDrugOptions}
              data={this.nonDrugChartData}
            />
          </ChartItem>
          <ChartItem>
            <ChartTitle>药品比(无饮)</ChartTitle>
            <Rate value={random(-1,1,2)} />
            <Chart
              defaultStyles={`height: 120px; margin-top:18px`}
              getOptions={this.getDrugOptions}
              data={this.drugChartData}
            />
          </ChartItem>
        </BlockArea>
        <LinkList list={this.list} />
      </>
    );
  }
}

export default TotalSingle;
