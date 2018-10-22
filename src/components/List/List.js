import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
const ListWrap = styled.ul`
  display: flex;
  flex-direction: column;
`;
const Item = styled.li`
  position: relative;
  border-bottom: 1px dotted #d3d3d3;
  &:last-child {
    border-bottom: none;
  }
`;

class List extends PureComponent {
  render() {
    const { list = [], defaultStyles, className } = this.props;
    return (
      <ListWrap defaultStyles={defaultStyles} className={className}>
        {list.map(ele => {
          const { id, to, content } = ele;
          return (
            <Item key={id}>
              {to ? <Link to={to}>{content}</Link> : content}
            </Item>
          );
        })}
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
