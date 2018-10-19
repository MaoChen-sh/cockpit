import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ControllSwitchHoc } from "wowjoy-component/es/tools";

const Wrap = styled.section`
  position: relative;
  width: 100vw;
  height: 160px;
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
const ShadowBox = styled.div`
  width: 75%;
  height: 60px;
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 0 0 50% 50%;
  box-shadow: 0 7px 30px rgba(193, 222, 248, 1);
  z-index: 0;
`;
/**
 *  staticSetting
 */

const dpr = window.devicePixelRatio || 1;
const oneDay = 24 * 3600 * 1000;
const defaultGetDataList = (endDay, length) => {
  return Array(length)
    .fill("")
    .map((ele, index) => {
      return endDay - oneDay * index;
    })
    .reverse();
};
/**
 *  计算时间
 * @param {number} date 初始日期
 * @param {number} addCount 增量
 * @param {string} type 类型
 */
const computeDate = (date, addCount, type) => {
  console.log(addCount, "add");
  let [year, month] = new Date(date).toLocaleDateString().match(/\d+/g);
  switch (type) {
    case "month":
      month = +month + addCount;
      year = +year + Math.floor(month / 12);
      month = month > 0 ? month % 12 : 12 + (month % 12);
      console.log(`${year}/${month}/1`);
      return new Date(`${year}/${month}/1`).valueOf();
    case "year":
      return new Date(`${+year + addCount}/1/1`).valueOf();
    default:
      return date + addCount * oneDay;
  }
};
/**
 *  Component
 */
class ArcDate extends PureComponent {
  constructor(props) {
    super();
    const { staticSetting, computedSetting, type, selectedDate } = props;
    console.log("object", selectedDate);
    this.staticSetting = {
      canvasW: window.innerWidth, // canvas 宽度
      canvasH: 150, // canvas 高度
      count: 30, // 半圆内分布量
      q: Math.PI / 1440, // 弧度和水平长度的比。优化动画，简化计算，直接通过固定比例设置，取消三角函数的不精确计算，防止过经过Π/2时的抖动
      endDate: new Date(new Date().toLocaleDateString()).valueOf(), // 最后日期
      viewCount: 7, // 可视项
      ...staticSetting
    };
    const { canvasW, canvasH, count, endDate, viewCount } = this.staticSetting;
    const r = Math.round(canvasW / 2 / Math.sin((Math.PI * 3.5) / count)); // 半径
    const finalDate = computedSetting.finalDate || endDate + 10 * oneDay;
    const getDateList =
      (computedSetting && computedSetting.getDateList) || defaultGetDataList;
    const dateList = getDateList(finalDate, count, type);

    this.computedSetting = {
      r: r,
      center: {
        // 圆心坐标
        x: canvasW / 2,
        y: canvasH - r
      },
      viewDeg: (Math.PI * viewCount) / count, // 可视角度
      deg: Math.PI / count, // 分布角度

      finalDate: finalDate, // 整体最后日期
      lastDate: finalDate, // 当前最后日期
      dateList: dateList, //日期列表
      getDateList: getDateList, //日期列表
      selectedDate: selectedDate || dateList[18], //选中的日期
      ...computedSetting
    };
    // 当前选中的项
  }

  componentDidMount() {
    this.draw("bg", "bgCircle");
    this.draw("date", "dateNumber");
    this.wrapNode.addEventListener(
      "touchmove",
      e => {
        e.preventDefault();
      },
      { passive: false }
    );
  }

  componentWillReceiveProps(nextProps) {
    const { count } = this.staticSetting;
    const { selectedDate, type } = this.props;
    const { computedSetting: nextComputedSetting, type: nextType } = nextProps;
    const finalDate =
      nextComputedSetting.finalDate || this.computedSetting.finalDate;
    if (type !== nextProps.type) {
      this.computedSetting = {
        ...this.computedSetting,
        ...nextComputedSetting,
        dateList: nextComputedSetting.getDateList(finalDate, count, nextType)
      };
    }
    if (selectedDate !== nextProps.selectedDate) {
      this.computedSetting.selectedDate =
        nextProps.selectedDate || finalDate - 11 * oneDay;
    }
  }
  componentDidUpdate(prevProps) {
    this.draw("bg", "bgCircle");
    if (this.isInertia) {
      const { q } = this.staticSetting;
      if (this.props.selectedDate !== prevProps.selectedDate) {
        this.isInertia = false;
        let relL = this.getScrollDegFromDate(this.props.selectedDate);
        let v0 = (relL > 0 ? 1 : -1) * q;
        let t0 = (2 * relL) / v0;
        let a = -v0 / t0;
        this.moveTo(v0, a);
      }
    } else {
      console.log("---\n", this.computedSetting.dateList);
      this.draw("date", "dateNumber", true);
    }
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
    const { canvasW, canvasH } = this.staticSetting;
    this[target].clearRect(0, 0, canvasW, canvasH + 10);
  };
  /**
   * 绘制图案
   */
  bgCircle = ctx => {
    const { canvasW, canvasH } = this.staticSetting;
    const { center, r } = this.computedSetting;

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

  dateNumber = (ctx, isClickCall) => {
    const { viewCount, count } = this.staticSetting;
    const {
      dateList,
      lastDate,
      viewDeg,
      center,
      r,
      deg,
      selectedDate,
      getDateList
    } = this.computedSetting;
    const { type } = this.props;
    let routeDeg = this.cacheDeg + this.deltaDeg;
    if (
      routeDeg < 0 &&
      this.computedSetting.lastDate === this.computedSetting.finalDate
    ) {
      routeDeg = 0;
    }
    if (!isClickCall && this.cachePrevRouteDeg === routeDeg) {
      return false;
    } else {
      this.cachePrevRouteDeg = routeDeg;
    }
    this.clear("date");
    ctx.font = "14px PingFangSC-Medium";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath();
    // 覆写当前可视数据
    if (Math.abs(routeDeg % Math.PI) >= 1 * viewDeg) {
      let arrow = routeDeg > 0 ? 1 : -1;
      this.cacheDeg -= arrow * viewDeg;
      this.computedSetting.dateList = getDateList(
        computeDate(lastDate, -arrow * viewCount, type),
        count,
        type
      );
      this.computedSetting.lastDate = this.computedSetting.dateList[
        this.computedSetting.dateList.length - 1
      ];
    }
    // 循环绘制日期
    dateList.forEach((ele, index) => {
      const currentDeg = deg * index + routeDeg;

      if (ele === selectedDate) {
        this.draw(
          "date",
          "selectedCircle",
          center.x - Math.cos(currentDeg) * (r - 4) - 8,
          center.y + Math.sin(currentDeg) * (r - 4)
        );
        ctx.fillStyle = "rgba(255,255,255,0.6)";
      }
      let content;

      switch (type) {
        case "month":
          content = new Date(ele).getMonth() + 1;
          break;
        case "year":
          content = new Date(ele).getYear() + 1900;
          break;
        default:
          content = new Date(ele).getDate();
      }

      ctx.fillText(
        content,
        center.x - Math.cos(currentDeg) * (r - 4) - String(content).length * 4,
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

  setRefCtx = name => el => {
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    el.width = rect.width * dpr;
    el.height = rect.height * dpr;
    const ctx = el.getContext("2d");
    ctx.scale(dpr, dpr);
    this[name] = ctx;
  };

  /**
   *  touch事件
   */
  startPoint = {};
  isNewTouchEvents = false;
  touchStart = e => {
    this.isNewTouchEvents = true;
    this.startTime = new Date();
    this.startPoint = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    };

    window.addEventListener("touchmove", this.touchMove, {
      passive: false,
      capture: true
    });
    window.addEventListener("touchend", this.touchEnd);
  };

  touchMove = e => {
    const { q } = this.staticSetting;
    const deltaL = e.touches[0].pageX - this.startPoint.x; // 水平滑动距离
    this.deltaDeg = deltaL * q;
    this.draw("date", "dateNumber");
  };

  touchEnd = e => {
    const { q } = this.staticSetting;
    this.cacheDeg += this.deltaDeg;
    this.deltaDeg = 0;
    window.removeEventListener("touchmove", this.touchMove, {
      passive: false,
      capture: true
    });
    window.removeEventListener("touchend", this.touchEnd);
    const touchL = e.changedTouches[0].pageX - this.startPoint.x; // 总滑动距离
    const now = new Date();
    const startV = touchL / (now - this.startTime); // 初始速度
    const speedThreshold = 0.1;

    this.isNewTouchEvents = false;
    if (Math.abs(startV) > speedThreshold) {
      this.inertia(touchL * q);
    } else {
      this.rebound(touchL * q);
    }
    this.startPoint = {};
  };

  // 惯性
  inertia = l => {
    this.isInertia = true;
    this.endAnime(l, true);
  };

  // 回弹
  rebound = l => {
    const { viewDeg } = this.computedSetting;
    const remainderDeg = Math.abs(this.cacheDeg) % viewDeg;
    if (remainderDeg === 0) {
      return;
    }
    if (remainderDeg > viewDeg / 3) {
      this.endAnime(l < 0 ? viewDeg - remainderDeg : remainderDeg - viewDeg);
    } else {
      this.endAnime(l);
    }
  };

  // 根据目标日期获取滚动距离
  getScrollDegFromDate = date => {
    const { viewDeg } = this.computedSetting;
    const { viewCount } = this.staticSetting;
    const selectedLastDate = date + oneDay * 10;
    const delta = Math.floor(
      (this.computedSetting.lastDate - selectedLastDate) / oneDay / viewCount
    );

    return delta * viewDeg - this.cacheDeg;
  };
  endAnime = (l, isInertia) => {
    const { viewCount, endDate } = this.staticSetting;
    const { viewDeg, selectedDate } = this.computedSetting;

    let a, v0, t0; // 加速度， 初速度， 时间
    let counterclockwise = l > 0; // 向右滑 —— 逆时针

    if (isInertia) {
      // 惯性
      if (
        !counterclockwise &&
        selectedDate &&
        selectedDate + viewCount * oneDay > endDate
      ) {
        return;
      }
      const nextDate =
        selectedDate +
        (counterclockwise ? -viewCount : viewCount) * oneDay -
        parseInt(l / viewDeg) * viewCount * oneDay;
      this.onDateChange(nextDate);
    } else {
      // 回弹
      const relL = this.getScrollDegFromDate(selectedDate);
      counterclockwise = relL > 0; // 向右滑 —— 逆时针
      t0 = 300;
      v0 = (2 * relL) / t0;
      a = -v0 / t0;
      this.moveTo(v0, a);
    }
  };
  moveTo = (v, a) => {
    const { viewDeg } = this.computedSetting;
    let v0 = v;
    let a0 = a;
    let t0 = new Date();
    const anime = () => {
      if (this.isNewTouchEvents) {
        this.isAnimating = false;
        return;
      }
      this.isAnimating = true;
      const { count } = this.staticSetting;
      const { dateList, finalDate } = this.computedSetting;
      const repain = () => {
        this.draw("date", "dateNumber");
        this.isAnimating = false;
      };
      if (v0 < 0 && dateList[count - 1] === finalDate && this.cacheDeg <= 0) {
        this.cacheDeg = 0;
        repain();
        return;
      }
      const nextT = new Date();
      const deltaT = nextT - t0;
      t0 = nextT;
      let deltaL = v0 * deltaT + (a0 * deltaT * deltaT) / 2;
      const nextV = v0 + a0 * deltaT;
      if (nextV === 0 || v0 / nextV < 0) {
        this.cacheDeg = Math.round(this.cacheDeg / viewDeg) * viewDeg;
        repain();
        return;
      }
      v0 = nextV;
      this.cacheDeg += deltaL;
      repain();
      window.requestAnimationFrame(anime);
    };
    window.requestAnimationFrame(anime);
  };

  /**
   *  日期点击
   */
  clickHandle = e => {
    const { center, r, deg, dateList } = this.computedSetting;
    const { clientX: x, clientY: y } = e;
    if (y > 90 && y < 150) {
      const squareR = Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2);
      if (squareR < Math.pow(r + 15, 2) && squareR > Math.pow(r - 25, 2)) {
        const currentDeg = Math.atan((x - center.x) / (y - center.y));
        const remainderDeg = currentDeg % deg;
        const selectedIndex =
          Math.round((currentDeg - this.cacheDeg) / deg) + 15;
        // 限制触发范围
        if (remainderDeg < deg / 3 || remainderDeg > (deg * 2) / 3) {
          this.onDateChange(dateList[selectedIndex]);
        }
      }
    }
  };

  onDateChange = date => {
    if (!date) {
      return;
    }
    const { onChange } = this.props;
    onChange && onChange(date);
  };

  render() {
    const { canvasH, canvasW } = this.staticSetting;
    const { children } = this.props;
    return (
      <Wrap
        innerRef={el => {
          this.wrapNode = el;
        }}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onClick={this.clickHandle}
      >
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
        <ShadowBox />
        {children}
      </Wrap>
    );
  }
}

ArcDate.propTypes = {
  staticSetting: PropTypes.object,
  onChange: PropTypes.func,
  selectedDate: PropTypes.number
};

export default ControllSwitchHoc({
  value: "selectedDate",
  defaultValue: "defaultSelectedDate"
})(ArcDate);
