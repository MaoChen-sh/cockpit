import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { List, RightArrow } from "components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Select as SelectBase } from "wowjoy-component";
const ListItem = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
  align-items: center;
  padding-left: 20px;
  padding-right: 10px;
  font-size: 14px;
  line-height: 1;
  justify-content: space-between;
  span {
    color: #333;
    &:first-child {
      color: #4a4a4a;
    }
    &:last-child {
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: space-between;
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

class ListTemp extends PureComponent {
  transTitle = title =>
    title.map((ele, index) => {
      if (typeof ele === "string") {
        return <div key={index}>{ele}</div>;
      }
      if (ele.sort) {
        return (
          <div key={index}>
            <div
              className={`list_title--sort ${ele.sort}`}
              onClick={ele.onSort}
            >
              {ele.content}
            </div>
          </div>
        );
      }
      if (ele.options) {
        const options = ele.options.map(ele => ({
          label: ele,
          value: ele
        }));
        return (
          <Select
            key={index}
            inputRender={({ value }) => <div>{value.label}</div>}
            defaultValue={options[0].value}
            onChange={ele.onChange}
            options={options}
          />
        );
      }
      return <div key={index}>{ele.content}</div>;
    });
  transList = list =>
    list.map(ele => {
      const { name, value, to } = ele;
      return {
        content: (
          <ListItem>
            <span>{name}</span>
            <span>
              {value}
              {to && <RightArrow shadow={false} />}
            </span>
          </ListItem>
        ),
        to: to
      };
    });

  render() {
    const { title: propsTitle = [], list: propsList = [] } = this.props;
    const title = this.transTitle(propsTitle);
    const list = this.transList(propsList);
    return (
      <List
        defaultStyles={`.list-title>div:last-child{width: 90px;}`}
        title={title}
        list={list}
      />
    );
  }
}

ListTemp.propTypes = {
  title: PropTypes.array,
  list: PropTypes.array
};

export default ListTemp;
