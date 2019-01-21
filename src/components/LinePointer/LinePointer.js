import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Pointer = styled.div`
  color: #999;
  font-size: 10px;
  position: relative;
  text-align: center;
  width: 95%;
  padding: 15px 0;
  margin: 0 auto;
  &::before {
    content: "";
    position: absolute;
    height: 2px;
    background: #ccc;
    top: 0;
    left: 10px;
    bottom: 0;
    right: 10px;
    margin: auto 0;
    display: block;
  }
  & > span {
    position: relative;
    z-index: 2;
    background: #f5f5f5;
    display: inline-block;
    padding: 0 10px;
  }
  ${p => p.defaultStyles}
`;
class LinePointer extends PureComponent {
  render() {
    const { children, defaultStyles, className } = this.props;
    return (
      <Pointer className={className} defaultStyles={defaultStyles}>
        <span>{children}</span>
      </Pointer>
    );
  }
}

LinePointer.propTypes = {
  defaultStyles: PropTypes.string,
  className: PropTypes.string
};

export default LinePointer;
