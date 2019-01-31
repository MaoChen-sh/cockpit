import React, { PureComponent } from "react";
import { LinkList } from "view/components";
import { ReactComponent as Approved } from "static/svg/approved.svg";
import { ReactComponent as Real } from "static/svg/real.svg";
import { ReactComponent as Add } from "static/svg/add.svg";
import { ReactComponent as Borrow } from "static/svg/borrow.svg";
class Detail extends PureComponent {
  constructor(props){
    super(props)
    document.title=props.location.state.title
  }
  get list() {
    return [
      {
        svg: Approved,
        content: "核定床位数",
        value: Math.ceil(Math.random() * 50 + 30)
      },
      {
        svg: Real,
        content: "实际病人数",
        value: Math.ceil(Math.random() * 50 + 30)
      },
      {
        svg: Add,
        content: "加床数",
        value: Math.ceil(Math.random() * 10)
      },
      {
        svg: Borrow,
        content: "借床数",
        value: Math.ceil(Math.random() * 10)
      }
    ];
  }
  render() {
    return <LinkList list={this.list} />;
  }
}


export default Detail;
