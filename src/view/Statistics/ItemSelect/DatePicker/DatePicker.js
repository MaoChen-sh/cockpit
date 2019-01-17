import React, { PureComponent } from "react";
import { Calendar } from "components";
import styled from "styled-components";
import { ReactComponent as IconCalendar } from "static/svg/calendar.svg";
import { getYMD } from "tools";
import { ControllSwitchHoc } from "wowjoy-component/es/tools";
const Wrap = styled.div`
  height: 100%;

  flex-grow: 1;
`
const ItemView = styled.div`
  width: 100%;
  height: 100%;
  font-size: 12px;
  color: ${p => (p.hasValue ? "#333" : "#999")};
  line-height: 36px;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    path {
      fill: #999;
    }
  }
`;
class DatePicker extends PureComponent {
  state = {
    calendarView: false
  };

  showCalendar = () => {
    this.setState({
      calendarView: true
    });
  };
  hideCalendar = () => {
    this.setState({
      calendarView: false
    });
  };
  onDateChange = date => {
    const { onChange } = this.props;
    onChange && onChange(date);
    this.hideCalendar();
  };
  get dateStr() {
    const { value } = this.props;
    const [Y, M, D] = getYMD(value[0]);
    const [Y1, M1, D1] = getYMD(value[1]);
    return `${Y}年${M}月${D}日—${Y1}年${M1}月${D1}日`;
  }
  render() {
    const { value } = this.props;
    const { calendarView } = this.state;
    return (
      <Wrap >
        <ItemView hasValue={!!value} onClick={this.showCalendar}>
          <IconCalendar />
          {value ? this.dateStr : "请选择要对比的时间"}
        </ItemView>

        {calendarView && (
          <Calendar
            selectRange
            onChange={this.onDateChange}
            onCancel={this.hideCalendar}
            value={value|| undefined}
          />
        )}
      </Wrap>
    );
  }
}
export default ControllSwitchHoc()(DatePicker);
