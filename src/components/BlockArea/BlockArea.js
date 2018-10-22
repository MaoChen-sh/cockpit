import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const Box = styled.section`
  background: #ffffff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 95%;
  margin : 10px auto 0;
  padding: 10px 5%;
`;
const NavTitle = styled.h2`
  font-size: 14px;
  color: #4a4a4a;
  text-align: center;
`;

class BlockArea extends PureComponent {
  render() {
    const { defaultStyles, className, title, children } = this.props;
    return (
      <Box defaultStyles={defaultStyles} className={className}>
        <NavTitle className={"block-area-title"}>{title}</NavTitle>
        {children}
      </Box>
    );
  }
}

BlockArea.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  title: PropTypes.node
};

export default BlockArea;
