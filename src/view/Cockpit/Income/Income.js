import React, { PureComponent } from "react";
import { BlockArea } from "components";
import { ListTemp, HeaderTemp } from "view/Cockpit/components";
import { $fetch, apis } from "config";
import { getMoney } from "tools";
const fakeData = [
  {
    name: "妇产科",
    value: 123897
  },
  {
    name: "消化内科",
    value: 123897
  },
  {
    name: "耳鼻喉科",
    value: 123897
  },
  {
    name: "神经外科",
    value: 123897
  },
  {
    name: "骨科",
    value: 123897
  },
  {
    name: "肿瘤科",
    value: 123897
  },
  {
    name: "产科",
    value: 123897
  },
  {
    name: "肝脏移植科",
    value: 123897
  },
  {
    name: "血液科",
    value: 123897
  }
];
class Income extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      countListUp: true
    };
  }
  strObj = {
    total: "医疗总收入",
    uninhospital: "门急诊收入",
    inhospital: "住院收入",
    nondrug: "非药品收入",
    drug: "药品收入"
  };
  onCountListSort = () => {
    this.setState({
      countListUp: !this.state.countListUp
    });
  };
  render() {
    const { countListUp } = this.state;
    const {
      match: {
        params: { type }
      }
    } = this.props;
    const str = this.strObj[type];
    return (
      <div>
        <HeaderTemp small title={str} count={getMoney(1800800)} />
        <BlockArea title={`不同科室的${str}`}>
          <ListTemp
            title={[
              "科室",
              {
                content: str,
                sort: countListUp ? "up" : "down",
                onSort: this.onCountListSort
              }
            ]}
            list={fakeData
              .sort((a, b) => (countListUp ? -1 : 1) * (a.value - b.value))
              .map(ele => ({
                ...ele,
                value: getMoney(ele.value),
                to: "/"
              }))}
          />
        </BlockArea>
      </div>
    );
  }
}

Income.propTypes = {};

export default Income;
