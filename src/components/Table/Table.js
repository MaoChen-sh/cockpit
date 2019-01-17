import React, { PureComponent } from "react";
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
 
  }
  tbody > tr {
    position: relative;
    border-bottom: 1px dotted #d3d3d3;
    td:first-child {
      padding-left: 20px;
    }
    &:last-child {
      border-bottom: none;
    }
  }
  td,th{
    i{
      vertical-align: middle;
    }
  }
`;
class Table extends PureComponent {
  render() {
    return <Main {...this.props} />;
  }
}


export default Table;
