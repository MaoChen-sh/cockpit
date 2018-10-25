import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
const ListWrap = styled.div`
  ${p => p.defaultStyles};
`;
const Title = styled.div`
  background: #ddf4ff;
  font-size: 14px;
  color: #333333;
  font-weight: bold;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content:space-between;
  &>*{
    flex-shrink:0
    flex-grow:0
  }
`;
const ListMenu = styled.ul`
  display: flex;
  flex-direction: column;
`;
const Item = styled.li`
  position: relative;
  border-bottom: 1px dotted #d3d3d3;
  display: flex;
  &:last-child {
    border-bottom: none;
  }
`;

class List extends PureComponent {
  render() {
    const { list = [], defaultStyles, className, title } = this.props;
    return (
      <ListWrap defaultStyles={defaultStyles} className={className}>
        {title && <Title className={'list-title'}>{title}</Title>}
        <ListMenu>
          {list.map((ele, index) => {
            const { id, to, content } = ele;
            return (
              <Item key={id || index}>
                {to ? <Link to={to}>{content}</Link> : content}
              </Item>
            );
          })}
        </ListMenu>
      </ListWrap>
    );
  }
}

List.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  list: PropTypes.array
};

export default List;
