import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link as LinkBase } from "react-router-dom";
const Box = styled.section`
  background: #ffffff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  width: 95%;
  margin: 10px auto 0;
  padding: 14px 5%;
  position: relative;
`;
const Link = styled(LinkBase)`
  position: absolute;
  right: 20px;
  top: 14px;
  font-size: 12px;
  color: #24a3e6;
  line-height: 16px;
`;
const NavTitle = styled.h2`
  font-size: ${p => (p.hasCount ? "12px" : "14px")};
  line-height: 16px;
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
    const {
      defaultStyles,
      className,
      title,
      children,
      count,
      onClick,
      to
    } = this.props;
    return (
      <Box
        defaultStyles={defaultStyles}
        className={className}
        onClick={onClick}
      >
        {to && <Link to={to}>更多</Link>}
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
  title: PropTypes.node,
  onClick: PropTypes.func,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default BlockArea;
