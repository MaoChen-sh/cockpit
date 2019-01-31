import React, { PureComponent } from "react";
import { BlockArea, Chart, Rate } from "components";
import styled from "styled-components";
import { TableTemp as TableBase } from "view/components";
import { getMoney, random } from "tools";
const Table = styled(TableBase)`
  tbody > tr td:first-child {
    padding-left: 0;
  }
  tbody > tr td:last-child {
    padding-right: 0;
  }
`;
const IncomeLeft = styled.div`
  color: #4a4a4a;
  width: 90px;
  margin-right: 16px;
  &::before {
    content: "";
    display: inline-block;
    background: ${p => p.color};
    width: 9px;
    height: 9px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
class DrugSingle extends PureComponent {
  get data() {
    return [
      {
        name: "西药",
        color: "#FFC75B",
        value: random(100000, 1000000),
        rate: random(-1, 1, 2),
        id: 1
      },
      {
        name: "中成药",
        color: "#F88287",
        value: random(100000, 1000000),
        rate: random(-1, 1, 2),
        id: 2
      },
      {
        name: "中草药",
        color: "#24B1F3",
        value: random(100000, 1000000),
        rate: random(-1, 1, 2),
        id: 3
      }
    ];
  }
  getOption = data => ({
    color: ["#FFC75B", "#F88287", "#24B1F3"],
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
  });
  render() {
    return (
      <>
        <BlockArea title="不同类别的药品收入">
          <Chart
            defaultStyles={`height: 120px;`}
            getOptions={this.getOption}
            data={this.data}
          />
          <Table
            noHeader
            noArrow
            data={[
              {
                name: "药品月收入",
                value: this.data.reduce((res, item) => {
                  return +item.rate + res;
                }, +this.data[0].value),
                rate:
                  this.data.reduce((res, item) => {
                    return +item.rate + res;
                  }, +this.data[0].rate) / 3,
                id: 0
              },
              ...this.data
            ]}
            columns={[
              {
                render: ele => (
                  <IncomeLeft color={ele.color}>{ele.name}</IncomeLeft>
                ),
                id: "name"
              },

              {
                render: ele => <Rate value={ele.rate} />,
                id: "rate"
              },
              {
                className: "text-right pr-20-i",
                render: ele => getMoney(ele.value),
                id: "value"
              }
            ]}
          />
        </BlockArea>
      </>
    );
  }
}

export default DrugSingle;
