import React, { Component } from "react";
import Routers from "./Routers";

import styled from "styled-components";
import BottomNav from "components/BottomNav";
import { ReactComponent as cockpit } from "static/svg/cockpit.svg";
import { ReactComponent as special } from "static/svg/special.svg";
import { ReactComponent as statistics } from "static/svg/statistics.svg";
import { ReactComponent as nursing } from "static/svg/nursing.svg";
import { ReactComponent as mine } from "static/svg/mine.svg";
const Nav = styled(BottomNav)`
  svg.bottom-nav-svg__active{
    path {
        &.bg,&.border{
          fill: url(#line-grad)
        }
        &.normal{
          fill: transparent
        }
        fill: #fff;
      }
  }
`; 

const staticNavList = [
  {
    svg: cockpit,
    content: "驾驶舱",
    id: "cockpit",
    url: "/cockpit"
  },
  {
    svg: special,
    content: "专题",
    id: "spec",
    url: "/spec"
  },
  {
    svg: statistics,
    content: "统计",
    id: "statistics",
    url: "/statistics"
  },
  {
    svg: nursing,
    content: "护理",
    id: "nursing",
    url: "/nursing"
  },
  {
    svg: mine,
    content: "我的",
    id: "mine",
    url: "/mine"
  }
];

class App extends Component {
  render() {
    const { location } = this.props;
    console.log(location.pathname);
    return (
      <div className="App">
        <Routers />
        <Nav
          navList={staticNavList}
          activeId={location.pathname.match(/\w+/g)[0]}
        />
      </div>
    );
  }
}

export default App;
