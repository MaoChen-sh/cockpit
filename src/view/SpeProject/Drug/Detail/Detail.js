import React, { PureComponent } from "react";
import { BlockArea, Rate } from "components";
import { getMoney } from "tools";
import { TableTemp as Table } from "view/components";

const TEXT = {
  analysis: "药品分析",
  diffDrug: "不同种类药品",
  amount: "金额"
};
const fakeData = [
  {
    name: "青霉素抗生素总金额",
    value: Math.ceil(Math.random() * 100000 + 500000)
  },
  {
    name: "阿奇霉素类抗生素总金额",
    value: Math.ceil(Math.random() * 100000 + 500000)
  },
  {
    name: "大环内酯类抗生素总金额",
    value: Math.ceil(Math.random() * 100000 + 500000)
  }
];

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    const states = props.location.state;
    this.isDay = states.type === "day";
    this.drug = states.drug;
    this.drugName = states.drugName;
    this.columns = [
      {
        title: TEXT.diffDrug,
        render: ele => ele.name,
        id: "name"
      },
      ...(this.isDay
        ? []
        : [
            {
              title: "环比数据",
              sortKey: "rate",
              render: ele => <Rate value={ele.rate} />,
              id: "rate"
            }
          ]),
      {
        title: TEXT.amount,
        render: ele => getMoney(ele.value),
        id: "value"
      }
    ];
  }

  listData = fakeData.map((ele, index) => ({
    ...ele,
    id: index,
    rate: this.isDay ? undefined : Math.random() - 0.5
  }));
  render() {
    return (
      <>
        <BlockArea title={this.drugName + TEXT.analysis}>
          <Table noArrow data={this.listData} columns={this.columns} />
        </BlockArea>
      </>
    );
  }
}

export default Detail;
