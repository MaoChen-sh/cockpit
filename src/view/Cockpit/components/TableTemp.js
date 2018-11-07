import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Table as TableBase, RightArrow } from "components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Select as SelectBase } from "wowjoy-component";
const Table = styled(TableBase)`
  thead > tr > th:last-child {
    width: 90px;
  }
  tbody > tr {
    height: 40px;
    font-size: 14px;
    td {
      color: #333;
      &:first-child {
        color: #4a4a4a;
      }
    }
  }
`;
const Select = styled(SelectBase)`
  padding: 0;
  border: 0;
  width: auto;
  height: auto;
  border-radius: 0;
  padding-right: 22px;
  background: none;
  &::after {
    border-top: 4px solid #0d86e8;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
  }
  &.open {
    box-shadow: none;
    color: #0d86e8;
  }
  .wjc-select-list {
    left: -20px;
    width: 85vw;
    margin-top: 8px;
    border: none;
    box-shadow: 0 4px 4px -1px rgba(113, 113, 113, 0.5);
    z-index: 1;
    li {
      color: #666666;
      padding: 13px 20px;
      position: relative;
      &:hover {
        background: #fff;
      }
      &.active {
        color: #0d86e8;
        &::after {
          content: "";
          display: inline-block;
          width: 13px;
          height: 7px;
          border-bottom: 2px solid currentColor;
          border-left: 2px solid currentColor;
          right: 20px;
          position: absolute;
          top: 50%;
          transform: rotate(-45deg) translateY(-50%);
        }
      }
    }
  }
`;

const selectRender = ({ value }) => <div>{value.label}</div>;
class TableTemp extends PureComponent {
  get columns() {
    const { columns } = this.props;
    return columns.map((ele, index) => {
      const { title, sort, onSort, options } = ele;
      let newTitle = <div>{title}</div>;
      if (sort) {
        newTitle = (
          <div key={index}>
            <div className={`list_title--sort ${ele.sort}`} onClick={onSort}>
              {title}
            </div>
          </div>
        );
      }

      if (options) {
        const newOptions = options.map(ele => ({
          label: ele,
          value: ele
        }));
        newTitle = (
          <Select
            key={index}
            inputRender={selectRender}
            defaultValue={newOptions[0].value}
            onChange={ele.onChange}
            newOptions={newOptions}
          />
        );
      }
      return {
        ...ele,
        title: newTitle
      };
    });
  }

  render() {
    const { columns, data } = this.props;

    return <Table columns={this.columns} data={data} />;
  }
}

TableTemp.propTypes = {
  title: PropTypes.array,
  list: PropTypes.array
};

export default TableTemp;
