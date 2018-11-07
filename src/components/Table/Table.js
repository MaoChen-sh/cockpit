import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Table as TableBase } from "wowjoy-component";
import styled from "styled-components";

const Main = styled(TableBase)`
  width: 100%;
  thead > tr {
    background: #ddf4ff;
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    height: 40px;
    text-align: left;
    th:first-child {
      padding-left: 20px;
    }
    th:last-child {
      padding-right: 20px;
    }
  }
  tbody > tr {
    position: relative;
    border-bottom: 1px dotted #d3d3d3;
    td:first-child {
      padding-left: 20px;
    }
    td:last-child {
      padding-right: 20px;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;
class Table extends PureComponent {
  render() {
    return <Main {...this.props} />;
  }
}

Table.propTypes = {};

export default Table;
