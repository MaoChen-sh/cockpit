import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ControllSwitchHoc } from "wowjoy-component/es/tools";

const DataCircle = styled.canvas`
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

const dpr = window.devicePixelRatio || 1;
const defaultGetDataList = (finalIndex, length) => {
  const oneDay = 24 * 3600 * 1000;
  const endDay = new Date(new Date().toLocaleDateString()).valueOf();
  return Array(length)
    .fill("")
    .map((ele, index) => {
      const value = endDay + oneDay * (index - finalIndex);
      return {
        value: value,
        label: new Date(value).getDay()
      };
    });
};
/**
 *  Component
 */
class ArcDate extends PureComponent {
  constructor(props) {
    super();
    const { staticSetting, computedSetting, type, selectedValue } = props;
    const canvasW = window.innerWidth;
    const canvasH = 150;
    const count = 30;
    const viewCount = 7;
    const r = Math.round(canvasW / 2 / Math.sin((Math.PI * 3.5) / count)); // 半径
    const finalVisibleIndex = 18;

    this.staticSetting = {
      canvasW: canvasW, // canvas 宽度
      canvasH: canvasH, // canvas 高度
      r: r,
      center: {
        // 圆心坐标
        x: canvasW / 2,
        y: canvasH - r
      },
      count: count, // 半圆内分布量
      deg: Math.PI / count, // 分布角度
      viewCount: viewCount, // 可视项
      viewDeg: (Math.PI * viewCount) / count, // 可视角度
      q: Math.PI / 1440, // 弧度和水平长度的比。优化动画，简化计算，直接通过固定比例设置，取消三角函数的不精确计算，防止过经过Π/2时的抖动
      finalVisibleIndex: finalVisibleIndex, // 最终可视项
      ...staticSetting
    };

    const getDataList =
      (computedSetting && computedSetting.getDataList) || defaultGetDataList;
    const dataList = getDataList(finalVisibleIndex, count, type);

    this.computedSetting = {
      page: 0, // 当前页数
      dataList: dataList, // 数据列表
      getDataList: getDataList, // 数据列表获取函数
      selectedValue: selectedValue || 0, //选中的值
      ...computedSetting
    };
    // 当前选中的项
  }

  componentDidMount() {
    this.draw("dataNumber");
  }

  componentWillReceiveProps(nextProps) {
    const { finalVisibleIndex, count } = this.staticSetting;
    const { selectedValue, type } = this.props;
    const { computedSetting: nextComputedSetting, type: nextType } = nextProps;
    if (type !== nextType) {
      this.cachePrevRouteDeg = "";
      this.computedSetting = {
        ...this.computedSetting,
        ...nextComputedSetting,
        dataList: nextComputedSetting.getDataList(
          finalVisibleIndex,
          count,
          nextType
        )
      };
    }
    if (selectedValue !== nextProps.selectedValue) {
      this.computedSetting.selectedValue = nextProps.selectedValue || 0;
    }
  }
  componentDidUpdate(prevProps) {
    if (this.isInertia) {
      const { q, viewDeg } = this.staticSetting;
      const { page } = this.computedSetting;
      if (this.props.selectedValue !== prevProps.selectedValue) {
        this.isInertia = false;
        let relL =
          (Math.floor(-this.props.selectedValue / 7) + page) * viewDeg -
          this.cacheDeg;
        let v0 = (relL > 0 ? 1 : -1) * q;
        let t0 = (2 * relL) / v0;
        let a = -v0 / t0;
        this.moveTo(v0, a);
      }
    } else {
      this.draw("dataNumber", true);
    }
  }

  cacheDeg = 0;
  deltaDeg = 0;
  // canvas 绘制派发
  draw = (item, ...options) => {
    return this[item](this.canvasCtx, ...options);
  };
  // canvas 清空
  clear = () => {
    const { canvasW, canvasH } = this.staticSetting;
    this.canvasCtx.clearRect(0, 0, canvasW, canvasH + 10);
  };

  dataNumber = (ctx, isClickCall) => {
    const {
      viewCount,
      count,
      viewDeg,
      center,
      r,
      deg,
      finalVisibleIndex
    } = this.staticSetting;
    const { page, dataList, selectedValue, getDataList } = this.computedSetting;
    const { type } = this.props;
    let routeDeg = this.cacheDeg + this.deltaDeg;
    if (!isClickCall && this.cachePrevRouteDeg === routeDeg) {
      return false;
    } else {
      this.cachePrevRouteDeg = routeDeg;
    }
    if (routeDeg < 0 && page === 0) {
      routeDeg = 0;
    }
    this.clear("data");
    ctx.font = "14px PingFangSC-Medium";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath();
    // 覆写当前可视数据
    if (Math.abs(routeDeg % Math.PI) >= 1 * viewDeg) {
      let arrow = routeDeg > 0 ? -1 : 1;
      this.cacheDeg += arrow * viewDeg;
      this.computedSetting.dataList = getDataList(
        finalVisibleIndex,
        count,
        type,
        viewCount * (page + arrow)
      );
      this.computedSetting.page += arrow;
    }

    // 循环绘制日期
    dataList.forEach((ele, index) => {
      const currentDeg = deg * index + routeDeg;

      if (ele.value === selectedValue) {
        this.draw(
          "selectedCircle",
          center.x - Math.cos(currentDeg) * (r - 4) - 8,
          center.y + Math.sin(currentDeg) * (r - 4)
        );
        ctx.fillStyle = "rgba(255,255,255,0.6)";
      }
      let content = ele.label;

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

  setRefCtx = el => {
    if (!el) {
      return;
    }
    const rect = el.getBoundingClientRect();
    el.width = rect.width * dpr;
    el.height = rect.height * dpr;
    const ctx = el.getContext("2d");
    ctx.scale(dpr, dpr);
    this.canvasCtx = ctx;
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
    this.draw("dataNumber");
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
    const { viewDeg } = this.staticSetting;
    const remainderDeg = Math.abs(this.cacheDeg) % viewDeg;
    if (remainderDeg === 0) {
      return;
    }
    this.endAnime(l);
  };

  endAnime = (l, isInertia) => {
    const { viewCount, viewDeg } = this.staticSetting;
    const { page, selectedValue } = this.computedSetting;

    let a, v0, t0; // 加速度， 初速度， 时间
    let counterclockwise = l > 0; // 向右滑 —— 逆时针

    if (isInertia) {
      // 惯性
      if (!counterclockwise && page === 0 && selectedValue >= 0) {
        // 滑动到最后禁止
        return;
      }
      const nextValue =
        selectedValue +
        (counterclockwise ? -viewCount : viewCount) -
        parseInt(l / viewDeg) * viewCount;
      this.onDataChange(nextValue > 0 ? 0 : nextValue);
    } else {
      // 回弹
      const relL =
        (Math.floor(-this.props.selectedValue / 7) + page) * viewDeg -
        this.cacheDeg;
      counterclockwise = relL < 0; // 向右滑 —— 逆时针
      t0 = 300;
      v0 = (2 * relL) / t0;
      a = -v0 / t0;
      this.moveTo(v0, a);
    }
  };
  moveTo = (v, a) => {
    const { viewDeg } = this.staticSetting;
    let v0 = v;
    let a0 = a;
    let t0 = new Date();
    const anime = () => {
      if (this.isNewTouchEvents) {
        this.isAnimating = false;
        return;
      }
      this.isAnimating = true;
      const { page } = this.computedSetting;
      const repain = () => {
        this.draw("dataNumber");
        this.isAnimating = false;
      };
      if (v0 < 0 && page === 0 && this.cacheDeg <= 0) {
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
    const { center, r, deg } = this.staticSetting;
    const { clientX: x, clientY: y } = e;
    if (y > 90 && y < 150) {
      const squareR = Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2);
      if (squareR < Math.pow(r + 15, 2) && squareR > Math.pow(r - 25, 2)) {
        const currentDeg = Math.atan((x - center.x) / (y - center.y));
        const remainderDeg = currentDeg % deg;
        const index = Math.round((currentDeg - this.cacheDeg) / deg) + 15;
        // 限制触发范围
        if (remainderDeg < deg / 3 || remainderDeg > (deg * 2) / 3) {
          const { dataList } = this.computedSetting;
          this.onDataChange(dataList[index].value);
        }
      }
    }
  };

  onDataChange = value => {
    if (value === false) {
      return;
    }
    const { onChange } = this.props;
    onChange && onChange(value);
  };

  render() {
    const { canvasH, canvasW } = this.staticSetting;
    return (
      <DataCircle
        innerRef={this.setRefCtx}
        width={canvasW}
        height={canvasH + 10}
        onClick={this.clickHandle}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
      />
    );
  }
}

ArcDate.propTypes = {
  staticSetting: PropTypes.object,
  onChange: PropTypes.func,
  selectedDate: PropTypes.number
};

export default ControllSwitchHoc({
  value: "selectedValue",
  defaultValue: "defaultSelectedValue"
})(ArcDate);
