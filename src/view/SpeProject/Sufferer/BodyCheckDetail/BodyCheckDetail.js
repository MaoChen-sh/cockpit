import { TablePageTemplate } from "view/Template";
import { random, getMoney } from "tools";
class BodyCheckDetail extends TablePageTemplate {
  constructor(props) {
    super(props);
    document.title = "套餐体检费用";
  }
  get headerProps() {
    return {
      count: getMoney(random(100, 1000)),
      title: "每体检人次费用"
    };
  }
  title = "不同套餐的体检费用";
  tableColumns = [
    {
      title: "套餐名称",
      render: ele => ele.name,
      id: "name"
    },
    {
      title: "套餐人数",
      render: ele => ele.value,
      id: "count"
    },
    {
      title: "收入金额",
      render: ele => getMoney(ele.money),
      id: "money"
    }
  ];
  get tableData() {
    return [
      "青年套餐(888元)",
      "女性套餐(1560元)",
      "妇科常规套餐(1560元)",
      "入职基本套餐(260元)",
      "妇科常规套餐(1560元)"
    ].map((ele, index) => ({
      name: ele,
      value: random(1, 50, 0),
      money: random(10000, 100000, 0),
      id: index
    }));
  }
}
export default BodyCheckDetail;
