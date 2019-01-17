import React, { Component } from "react";
import Routers from "./Routers";
import styled from "styled-components";
import BottomNav from "components/BottomNav";
import { ReactComponent as cockpit } from "static/svg/cockpit.svg";
import { ReactComponent as special } from "static/svg/special.svg";
import { ReactComponent as statistics } from "static/svg/statistics.svg";
import { ReactComponent as nursing } from "static/svg/nursing.svg";
import { ReactComponent as mine } from "static/svg/mine.svg";
import { $fetch, apis } from "config";
const Wrap = styled.div`
  padding-bottom: 48px;
  min-height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
`;
const Nav = styled(BottomNav)`
  svg.bottom-nav-svg__active {
    path {
      &.bg,
      &.border {
        fill: url(#line-grad);
      }
      &.normal {
        fill: transparent;
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
  constructor(props) {
    super(props);
    wxSign()
      .then(res => {
        const { result } = res;
        if (result) {
          const { appId, timestamp, signature, nonceStr } = result;
          const { wx } = window;
          wx.config({
            beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: window.location.search.includes("debug"), // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，企业微信的corpID
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature, // 必填，签名，见附录1
            jsApiList: ["hideOptionMenu"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(() => wx.hideOptionMenu());
        }
      })
      .catch(err => {
        // throw Error("微信认证异常");
      });
  }

  render() {
    const { location } = this.props;
    const pathArr = location.pathname.match(/\w+/g);
    return (
      <Wrap className="App">
        <Routers />
        <Nav navList={staticNavList} activeId={pathArr && pathArr[0]} />
      </Wrap>
    );
  }
}

function wxSign() {
  return $fetch.get(apis.wechat.config, null, true);
}
export default App;
