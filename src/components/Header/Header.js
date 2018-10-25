import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrap = styled.section`
  position: relative;
  width: 100vw;
  height: 160px;
  ${p => p.defaultStyles};
`;
const BackGround = styled.canvas`
  width: 100vw;
  height: 160px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
`;
const ShadowBox = styled.div`
  width: 75%;
  height: 100%;
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
 *  Component
 */
class Header extends PureComponent {
  constructor() {
    super();
    const canvasW = window.innerWidth;
    const canvasH = 150;
    const count = 30;
    const r = Math.round(canvasW / 2 / Math.sin((Math.PI * 3.5) / count)); // 半径

    this.staticSetting = {
      canvasW: canvasW, // canvas 宽度
      canvasH: canvasH, // canvas 高度
      r: r,
      center: {
        // 圆心坐标
        x: canvasW / 2,
        y: canvasH - r
      }
    };
  }

  componentDidMount() {
    this.draw();
    this.wrapNode.addEventListener(
      "touchmove",
      e => {
        e.preventDefault();
      },
      { passive: false }
    );
  }

  draw = () => {
    const { canvasW, canvasH, center, r } = this.staticSetting;
    const { bg } = this;
    const dpr = window.devicePixelRatio || 1;
    const rect = bg.getBoundingClientRect();
    bg.width = rect.width * dpr;
    bg.height = rect.height * dpr;
    const ctx = bg.getContext("2d");
    ctx.scale(dpr, dpr);
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

  render() {
    const { canvasH, canvasW } = this.staticSetting;
    const { children, className, defaultStyles } = this.props;
    return (
      <Wrap
        className={className}
        defaultStyles={defaultStyles}
        innerRef={el => {
          this.wrapNode = el;
        }}
      >
        <ShadowBox />
        <BackGround
          innerRef={el => (this.bg = el)}
          width={canvasW}
          height={canvasH + 10}
        />
        {children}
      </Wrap>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  staticSetting: PropTypes.object
};

export default Header;
