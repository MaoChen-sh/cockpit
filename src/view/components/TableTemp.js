import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Table as TableBase, RightArrow } from "components";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Select as SelectBase } from "wowjoy-component";
const Table = styled(TableBase)`
  ${p =>
    p.noHeader &&
    `thead{
     display: none
  }`}
      color: #333;

  tbody > tr {
    height: 40px;
    font-size: 14px;
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
  & > div {
    display: inline-block;
  }

  &::after {
    display: inline-block;
    margin-left: 6px;
    vertical-align: middle;
    position: static;
    width: 0;
    border-top: 4px solid #999;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
  }
  &.open {
    box-shadow: none;
    color: #0d86e8;
    &::after {
      border-top: 4px solid #0d86e8;
    }
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
    const { columns, noArrow } = this.props;
    return noArrow
      ? columns
      : [
          ...columns,
          {
            render: ele => (
              <RightArrow defaultStyles={"width: 20px"} shadow={false} />
            ),
            id: columns.length
          }
        ].map((ele, index) => {
          const { title, sort, onSort, options } = ele;
          let newTitle = <div>{title}</div>;
          if (sort) {
            newTitle = (
              <div key={index}>
                <div
                  className={`list_title--sort ${ele.sort}`}
                  onClick={onSort}
                >
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
                defaultStyles={`
                &>div{
                  display: inline-block
                }
                &::after{
                  display: inline-block;
                  margin-left: 6px;
                  vertical-align: middle;
                  position:static;
                  width:0;
                }
              `}
                key={index}
                inputRender={selectRender}
                defaultValue={newOptions[0].value}
                onChange={ele.onChange}
                options={newOptions}
              />
            );
          }
          return {
            ...ele,
            title: newTitle
          };
        });
  }
  rowClick = (ele, rowIndex) => {
    const { to, onClick } = ele;
    if (to) this.props.history.push(to);
    if (onClick) onClick(ele, rowIndex);
  };
  render() {
    const { className, defaultStyles, data, noHeader } = this.props;
    return (
      <Table
        noHeader={noHeader}
        onRowClick={this.rowClick}
        className={className}
        defaultStyles={defaultStyles}
        columns={this.columns}
        data={data}
      />
    );
  }
}

TableTemp.propTypes = {
  defaultStyles: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.array,
  list: PropTypes.array,
  noHeader: PropTypes.bool
};

export default withRouter(TableTemp);
