import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
const List = styled.ul`
  display: flex;
  justify-content: space-around;
  position: relative;
  z-index: 4;
  padding: 14px 5%;
`;
const Item = styled.li`
  width: 80px;
  height: 30px;
  border-radius: 15px;
  color: #fff;
  opacity: 0.8;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  ${p =>
    p.active &&
    `
    background: #fff;
    color: #333;
    `};
`;

class Tab extends PureComponent {
  render() {
    const { list, activeId } = this.props;
    return (
      <List >
        {list.map((ele) => {
          return (
            <Item key={ele.id} active={ele.id === activeId}>
              <Link to={ele.to}>{ele.content}</Link>
            </Item>
          );
        })}
      </List>
    );
  }
}

Tab.propTypes = {
  activeIndex: PropTypes.number,
  list: PropTypes.array
};

export default Tab;
