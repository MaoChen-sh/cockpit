import React, { Component } from "react";
import Routers from "./Routers";
import BottomNav from "components/BottomNav";

const staticNavList = [
  {
    svg: "",
    content: "驾驶舱",
    id: "cockpit",
    url: "/cockpit"
  },
  {
    svg: "",
    content: "专题",
    id: "spec",
    url: "/spec"
  },
  {
    svg: "",
    content: "统计",
    id: "statistics",
    url: "/statistics"
  },
  {
    svg: "",
    content: "护理",
    id: "nursing",
    url: "/nursing"
  },
  {
    svg: "",
    content: "我的",
    id: "mine",
    url: "/mine"
  },
];
class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <div className="App">
        <Routers />
        <BottomNav
          navList={staticNavList}
          activeId={location.pathname.replace(/^\//, "")}
        />
      </div>
    );
  }
}

export default App;
