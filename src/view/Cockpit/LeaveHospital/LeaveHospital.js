import React, { PureComponent } from "react";
import { BlockArea } from "components";
import { ListTemp, HeaderTemp } from "view/Cockpit/components";
import { $fetch, apis } from "config";
import fakeData from 'config/fakeData'
 
class LeaveHospital extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      countListUp: true,
      dataType: "area"
    };
  }

  onCountListSort = () => {
    this.setState({
      countListUp: !this.state.countListUp
    });
  };
  onOptionChange = val => {
    this.setState({
      dataType: val === "科室" ? "class" : "area"
    });
  };
  render() {
    const { countListUp, dataType } = this.state;

    return (
      <div>
        <HeaderTemp
          title={"出院人数"}
          count={476}
          subList={[{ title: "患者自动出院人数", count: 3 }]}
        />
        <BlockArea title={"不同科室和病区的出院人数"}>
          <ListTemp
            defaultStyles={`.list-title{padding-right: 42px}`}
            title={[
              {
                content: "病区",
                options: ["病区", "科室"],
                onChange: this.onOptionChange
              },
              {
                content: "人数",
                sort: countListUp ? "up" : "down",
                onSort: this.onCountListSort
              }
            ]}
            list={fakeData[dataType]
              .sort((a, b) => (countListUp ? -1 : 1) * (a.value - b.value))
              .map(ele => ({
                ...ele,
                to: "/"
              }))}
          />
        </BlockArea>
      </div>
    );
  }
}

export default LeaveHospital;
