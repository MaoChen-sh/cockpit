import React, { PureComponent } from "react";
import styled from "styled-components";
import {
  LinePointer,
  BlockArea as BlockAreaBase,
  Calendar,
  RightArrow as RightArrowBase
} from "components";
import DatePicker from "./DatePicker";
import InputAdder from "./InputAdder";
import { Link } from "react-router-dom";
import { selectedItem } from "context";

const ItemView = styled.div`
  width: 100%;
  font-size: 12px;
  color: ${p => (p.hasValue ? "#333" : "#999")};
  line-height: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BlockArea = styled(BlockAreaBase)`
  margin-top: 0;
`;
const RightArrow = styled(RightArrowBase)`
  &::after {
    border-color: #999;
  }
`;
const Submit = styled(Link)`
  display: block;
  font-size: 14px;
  color: #ffffff;
  background: #1baffa;
  border-radius: 8px;
  width: 242px;
  height: 40px;
  line-height: 40px;
  margin: 60px auto 0;
  text-align: center;
`;

const ProjectPicker = ({ value, onClick }) => (
  <ItemView hasValue={!!value} onClick={onClick}>
    {value || "请选择要对比的统计项"} <RightArrow shadow={false} />
  </ItemView>
);

class ItemSelect extends PureComponent {
  state = {
    calenderView: false,
    singleItemValue: "",
    threeItemValues: []
  };
  static contextType = selectedItem;

  get type() {
    const {
      params: { type }
    } = this.props.match;
    switch (type) {
      case "oneday":
        return "oneDate";
      case "oneproject":
        return "oneProject";
      default:
        throw new Error(
          'The type of router expect to be ("oneday" | "oneProject") but got' +
            type
        );
    }
  }
  get dateObj() {
    return {
      title: "时间",
      pointer: "时间点",
      Component: max => (
        <InputAdder
          min={1}
          max={max}
          component={DatePicker}
          onChange={this.onDateChange}
          defaultValue={[""]}
        />
      )
    };
  }
  onDateChange = value => this.context.editor(value, "date");

  get projectObj() {
    return {
      title: "统计项",
      pointer: "统计项",
      Component: max => (
        <ProjectPicker
          onClick={this.showProjectSelector(max)}
          value={this.projectValue}
        />
      )
    };
  }
  showProjectSelector = max => () => {
    const { history } = this.props;
    history.push("/statistics/projectselect?max=" + max);
  };
  showCalendar = () => {
    this.setState({
      calenderView: true
    });
  };

  hideCalendar = () => {
    this.setState({
      calenderView: false
    });
  };
  get projectValue() {
    return this.context.projectData.map(ele => ele.name).join(",");
  }
  render() {
    const {
      params: { type }
    } = this.props.match;
    const isSingleProject = type === "oneproject";

    const [singleItem, threeItem] = isSingleProject
      ? [this.projectObj, this.dateObj]
      : [this.dateObj, this.projectObj];
    return (
      <div>
        <LinePointer>{`最多选择一个${singleItem.pointer}`}</LinePointer>
        <BlockArea title={singleItem.title}>
          {singleItem.Component(1)}
        </BlockArea>

        <LinePointer>{`最多选择3个${threeItem.pointer}`}</LinePointer>
        <BlockArea title={threeItem.title}>{threeItem.Component(3)}</BlockArea>
        <Submit to={"/statistics/datadisplay"}>查看对比结果</Submit>
      </div>
    );
  }
}

ItemSelect.propTypes = {};

export default ItemSelect;
