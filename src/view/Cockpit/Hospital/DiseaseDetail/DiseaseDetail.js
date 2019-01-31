import React, { PureComponent } from "react";
import { TableTemp as Table } from "view/components";
import { BlockArea, Rate } from "components";
import fakeData from "config/fakeData";
class DiseaseDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.title = {
      in: "在院",
      enter: "入院",
      leave: "出院"
    }[props.match.params.type];
    document.title = this.title + "病种数";
  }

  columns = [
    {
      title: "病种",
      render: ele => ele.name,
      id: "name"
    },
    {
      title: "环比数据",
      render: ele => <Rate value={ele.rate} />,
      id: "rate"
    },
    {
      title: "数量",
      render: ele => ele.value,
      id: "value"
    }
  ];
  get data() {
    return fakeData["disease"].map((ele, index) => ({
      ...ele,
      id: index
    }));
  }
  render() {
    return (
      <BlockArea title={this.title + "人数的病种数"}>
        <Table columns={this.columns} data={this.data} />
      </BlockArea>
    );
  }
}

export default DiseaseDetail;
