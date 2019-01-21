import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TableTemp as TableBase } from "view/components";
import styled from "styled-components";
const Wrap = styled.div`
  width: 100%;
  position: relative;
  overflow-y: hidden;
`;
const Scroll = styled.div`
  overflow-y: scroll;
`;
const Left = styled.table`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
  tbody > tr {
    height: 40px;
    position: relative;
    border-bottom: 1px dotted #d3d3d3;
  }
  ${p =>
    p.shadow &&
    `
      box-shadow: 6px 0 6px -4px rgba(0,0,0,.15);
  `}
`;
const Th = styled.th`
  background: #ddf4ff;
  font-size: 14px;
  color: #333333;
  font-weight: bold;
  height: 40px;
  text-align: left;
  padding-left: 20px;
  padding-right: 10px;
  line-height: 40px;
`;
const Td = styled.td`
  padding-left: 20px;
  padding-right: 10px;
  font-size: 12px;
  background: #fff;
  height: 40px;
  word-break: break-all;
`;
const Table = styled(TableBase)`
  th {
    white-space: nowrap;
    padding: 0 10px;
    &:first-child > div {
      max-width: 90px;
      min-width: 60px;
    }
  }

  td {
    padding: 0 10px;
    white-space: nowrap;
    font-size: 12px;
    word-break: break-all;
    height: 40px;
    &:first-child {
      white-space: normal;
    }
  }
`;

class ScrollTable extends PureComponent {
  state = {
    leftShadow: false
  };
  componentDidMount() {
    const tableNode = this.leftNode.nextSibling;
    this.leftNode.style.width =
      tableNode.getElementsByTagName("th")[0].clientWidth + "px";
  }
  onScroll = e => {
    this.setState({
      leftShadow: e.target.scrollLeft > 0
    });
  };
  render() {
    const { data, columns } = this.props;
    const { leftShadow } = this.state;
    return (
      <Wrap>
        <Scroll onScroll={this.onScroll}>
          <Left shadow={leftShadow} ref={el => (this.leftNode = el)}>
            <thead>
              <tr>
                <Th>{columns[0].title}</Th>
              </tr>
            </thead>
            <tbody>
              {data.map(ele => (
                <tr key={ele.id}>
                  <Td>{columns[0].render(ele)}</Td>
                </tr>
              ))}
            </tbody>
          </Left>
          <Table {...this.props} />
        </Scroll>
      </Wrap>
    );
  }
}

ScrollTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array
};

export default ScrollTable;
