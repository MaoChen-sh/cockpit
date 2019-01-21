import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const Box = styled.section`
  background: #ffffff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 95%;
  margin: 10px auto 0;
  padding: 14px 5%;
`;
const NavTitle = styled.h2`
  font-size: ${p => (p.hasCount ? "12px" : "14px")};
  color: #666;
  font-weight: bold;
  text-align: center;
  padding-bottom: ${p => (!p.hasChildren ? 0 : "14px")};
  border-bottom: 1px dotted
    ${p => (p.hasCount && p.hasChildren ? "#D3D3D3" : "transparent")};
`;
const Count = styled.span`
  margin-left: 10px;
  font-size: 16px;
  color: #333;
`;
class BlockArea extends PureComponent {
  render() {
    const { defaultStyles, className, title, children, count } = this.props;
    return (
      <Box defaultStyles={defaultStyles} className={className}>
        {title && (
          <NavTitle
            className={"block-area-title"}
            hasCount={count || count === 0}
            hasChildren={!!children}
          >
            {title}
            {(count || count === 0) && <Count>{count}</Count>}
          </NavTitle>
        )}
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
