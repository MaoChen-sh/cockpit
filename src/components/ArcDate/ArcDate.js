import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrap = styled.section`
  position: relative;
  width: 100vw;
  height: 160px;
  background: #0b7fe6;
`;
const BackGround = styled.canvas`
  width: 100vw;
  height: 160px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;
const DateCircle = styled.canvas`
  width: 100vw;
  height: 160px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
`;
/**
 *  staticSetting
 */
const canvasW = window.outerWidth; // canvas 宽度
const canvasH = 150; // canvas 高度
const count = 30; // 半圆内分布量
const r = Math.round(canvasW / 2 / Math.sin((Math.PI * 3.5) / count)); // 半径
const center = {
  // 圆心坐标
  x: canvasW / 2,
  y: canvasH - r
};
const viewDeg = (Math.PI * 7) / count; // 可视角度

let deg = Math.PI / count; // 分布角度

let testNumber = Array(count) // 测试数据
  .fill("")
  .map((ele, index) => index + 1);
let q = Math.PI / 720; // 弧度和水平长度的比。优化动画，简化计算，直接通过固定比例设置，取消三角函数的不精确计算，防止过经过Π/2时的抖动

/**
 *  Component
 */
class ArcDate extends PureComponent {
  selectedDate = 13;
  componentDidMount() {
    this.draw("bg", "bgCircle");
    this.draw("date", "dateNumber");
  }
  cacheDeg = 0;
  deltaDeg = 0;

  // canvas 绘制派发
  draw = (target, item, ...options) => {
    const ctx = this[target];
    return this[item](ctx, ...options);
  };
  // canvas 清空派发
  clear = target => {
    this[target].clearRect(0, 0, canvasW, canvasH + 10);
  };
  /**
   * 绘制图案
   */
  bgCircle = ctx => {
    const lineargradient = ctx.createLinearGradient(
      canvasW,
      canvasH / 2,
      0,
      canvasH / 2
    );
    lineargradient.addColorStop(0, "#1ab6f4");
    lineargradient.addColorStop(1, "#0b7fe6");

    ctx.fillStyle = lineargradient;

    ctx.beginPath();
    ctx.arc(center.x, center.y, r, 0, Math.PI, false);
    ctx.fill();
    ctx.closePath();
  };

  dateNumber = ctx => {
    ctx.font = "14px PingFangSC-Medium";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath();
    const routeDeg = this.cacheDeg + this.deltaDeg;

    // 覆写当前可视数据
    if (Math.abs(routeDeg % Math.PI) > viewDeg) {
      if (routeDeg > 0) {
        this.cacheDeg -= viewDeg;
        testNumber = testNumber.map(ele => ele - 7);
      } else {
        this.cacheDeg += viewDeg;
        testNumber = testNumber.map(ele => ele + 7);
      }
    }

    // 循环绘制日期
    testNumber.forEach((ele, index) => {
      const currentDeg = deg * index + routeDeg;
      if (ele === this.selectedDate) {
        this.draw(
          "date",
          "selectedCircle",
          center.x - Math.cos(currentDeg) * (r - 4) - 8,
          center.y + Math.sin(currentDeg) * (r - 4)
        );
        ctx.fillStyle = "rgba(255,255,255,0.6)";
      }

      ctx.fillText(
        ele,
        center.x - Math.cos(currentDeg) * (r - 4) - String(ele).length * 4,
        center.y + Math.sin(currentDeg) * (r - 4)
      );
    });
    ctx.closePath();
  };

  selectedCircle = (ctx, x, y) => {
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.beginPath();
    ctx.arc(x + 8, y - 8, 21, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  };

  setRefCtx = name => el => (this[name] = el.getContext("2d"));

  render() {
    return (
      <Wrap onTouchStart={this.touchStart} onClick={this.clickHandle}>
        {/* <div
          style={{
            width: "1px",
            top: 0,
            bottom: 0,
            left: "50%",

            transform: `translateX(-50%)`,
            background: "#000",
            zIndex: 999,
            position: "absolute"
          }}
        /> */}
        <BackGround
          innerRef={this.setRefCtx("bg")}
          width={canvasW}
          height={canvasH + 10}
        />
        <DateCircle
          innerRef={this.setRefCtx("date")}
          width={canvasW}
          height={canvasH + 10}
        />
      </Wrap>
    );
  }
  /**
   *  touch事件
   */
  startPoint = {};
  isNewTouchEvents = false;
  touchStart = e => {
    // e.preventDefault();
    this.isNewTouchEvents = true;
    this.startTime = new Date();
    this.startPoint = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    };
    window.addEventListener("touchmove", this.touchMove);
    window.addEventListener("touchend", this.touchEnd);
  };

  touchMove = e => {
    const deltaL = e.touches[0].pageX - this.startPoint.x; // 水平滑动距离
    this.deltaDeg = deltaL * q;
    this.clear("date");
    this.draw("date", "dateNumber");
  };

  touchEnd = e => {
    this.cacheDeg += this.deltaDeg;
    this.deltaDeg = 0;

    window.removeEventListener("touchmove", this.touchMove);
    window.removeEventListener("touchend", this.touchEnd);
    const now = new Date();
    const startV =
      (e.changedTouches[0].pageX - this.startPoint.x) / (now - this.startTime); // 初始速度
    const speedThreshold = 0.08;

    this.isNewTouchEvents = false;
    if (Math.abs(startV) > speedThreshold) {
      this.inertia(startV);
    } else {
      this.rebound(startV);
    }
    // this.endAnime(startV, now);
    this.startPoint = {};
  };

  inertia = startV => {
    this.endAnime(startV, new Date());
  };

  // 回弹
  rebound = startV => {
    const remainderDeg = Math.abs(this.cacheDeg) % viewDeg;
    if (remainderDeg === 0) {
      return;
    }
    if (remainderDeg > viewDeg / 3) {
      this.endAnime(
        "",
        new Date(),
        startV < 0 ? viewDeg - remainderDeg : remainderDeg - viewDeg
      );
    } else {
      this.endAnime("", new Date(), startV < 0 ? remainderDeg : -remainderDeg);
    }
  };
  endAnime = (v, t, l) => {
    let relA, startV, t0;
    let startT = t;
    let counterclockwise = v > 0;
    if (l || l === 0) {
      counterclockwise = l > 0;
      startV = ((counterclockwise ? 1 : -1) * q) / 2;
      t0 = (2 * l) / startV;
      relA = -startV / t0;
    } else {
      counterclockwise = v > 0;
      startV = (counterclockwise ? 1 : -1) * q;
      const relL =
        (counterclockwise ? 1 : -1) *
        (Math.abs(viewDeg) - Math.abs(this.cacheDeg % viewDeg));
      t0 = (2 * relL) / startV;
      relA = -startV / t0;
    }

    const anime = () => {
      if (this.isNewTouchEvents) {
        return;
      }
      const nextT = new Date();
      const deltaT = nextT - startT;

      startT = nextT;
      let deltaL = startV * deltaT + (relA * deltaT * deltaT) / 2;
      startV = startV + relA * deltaT;
      if (Math.abs(startV) < Math.abs(relA) * 30) {
        this.cacheDeg = Math.round(this.cacheDeg / viewDeg) * viewDeg;
        this.clear("date");
        this.draw("date", "dateNumber");
        return;
      }
      this.cacheDeg += deltaL;
      this.clear("date");
      this.draw("date", "dateNumber");
      window.requestAnimationFrame(anime);
    };
    window.requestAnimationFrame(anime);
  };

  /**
   *  日期点击
   */
  clickHandle = e => {
    const { clientX: x, clientY: y } = e;
    if (y > 90 && y < 150) {
      const squareR = Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2);
      if (squareR < Math.pow(r + 15, 2) && squareR > Math.pow(r - 25, 2)) {
        const currentDeg = Math.atan((x - center.x) / (y - center.y));
        const remainderDeg = currentDeg % deg;
        const selectedIndex = Math.round((currentDeg - this.cacheDeg) / deg);
        if (remainderDeg < deg / 3 || remainderDeg > (deg * 2) / 3) {
          this.selectedDate = testNumber[selectedIndex + 15];
          this.clear("date");
          this.draw("date", "dateNumber");
        }
      }
    }
  };
}

ArcDate.propTypes = {};

export default ArcDate;
