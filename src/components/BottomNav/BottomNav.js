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
  padding: 6px 20px;
  background: #fff;
  box-shadow: 0 0 3px 0 #d5d5d5;
`;
const NavItem = styled(Link)`
  display: block;
  color: ${p => (p.active ? "#0d86e8" : "#666")};
  span {
    font-size: 10px;
  }
`;
class BottomNav extends PureComponent {
  render() {
    const { navList, activeId } = this.props;
    return (
      <Wrap>
        {navList.map(ele => (
          <NavItem
            key={ele.id}
            active={Number(activeId === ele.id)} // `Number()` to fix react 16, non-boolean attrs warning!
            to={ele.url}
          >
            <span>{ele.content}</span>
          </NavItem>
        ))}
      </Wrap>
    );
  }
}

export default BottomNav;
