import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Wrap = styled.section`
  position: fixed;
  bottom: 0;
  z-index: 99;
  left: 0;
  right: 0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 6px 0px;
  background: #fff;
  box-shadow: 0 0 3px 0 #d5d5d5;
`;
const NavItem = styled(Link)`
  display: block;
  color: ${p => (p.active ? "#0d86e8" : "#666")};
  text-align: center;
  & > span {
    font-size: 10px;
    display: block;
  }
  & > svg {
    width: 20px;
    height: 20px;
  }
`;
class BottomNav extends PureComponent {
  render() {
    const { className, navList, activeId } = this.props;
    return (
      <Wrap className={className}>
        {navList.map(ele => {
          const { id, url, content, svg: Svg } = ele;
          const active = Number(activeId === id);
          return (
            <NavItem
              key={id}
              active={active} // `Number()` to fix react 16, non-boolean attrs warning!
              to={url}
            >
              {Svg && <Svg className={active ? "bottom-nav-svg__active" : ""} />}
              <span>{content}</span>
            </NavItem>
          );
        })}
      </Wrap>
    );
  }
}

export default BottomNav;
