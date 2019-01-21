import React, { PureComponent } from "react";
import { Header, Tab, LinePointer,Calendar } from "components";
import { NavItem, ArcDatePicker } from "view/components";
import { ReactComponent as CalendarIconBase } from "static/svg/calendar.svg";
import styled from "styled-components";
import { getYMD } from "tools";

const CalendarView = styled.div`
  position: absolute;
  top: 67px;
  left: 50%;
  transform: translate(-50%);
  color: #fff;
  z-index: 4;
  display: inline-block;
  font-size: 14px;
`;
const CalendarIcon = styled(CalendarIconBase)`
  width: 16px;
  height: 16px;
  margin-left: 8px;
  vertical-align: text-bottom;
  path {
    fill: #fff;
  }
`;

const now = new Date(new Date().toLocaleDateString());
const endDateObj = (() => {
  let [year, month, day] = getYMD(now);
  if (month === 0) {
    year = year - 1;
    month = 12;
  }
  if (day < 2) {
    month = month - 1;
    if (month === 0) {
      year = year - 1;
      month = 12;
    }
  }
  return {
    year: new Date(`${year - 1}/1/1`),
    month: new Date(`${year}/${month}/1`),
    day: new Date(now - 24 * 3600000)
  };
})();
class DateSelectPageTemplate extends PureComponent {
  constructor(props) {
    super(props);
    const { type } = this;
    this.state = {
      currentDate: endDateObj[type],
      type: type
    };
  }

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
  getDateStr = date => {
    const [y, m, d] = getYMD(date);
    switch (this.type) {
      case "year":
        return `${y}年`;
      case "month":
        return `${y}年${m}月`;
      default:
        return `${y}年${m}月${d}日`;
    }
  };
  onDateChange = date => {
    this.setState({
      currentDate: date,
      calenderView: false
    });
  };

  reduceNavItem = list => {
    const { type } = this;
    return list.reduce((total, ele, index) => {
      if (index % 2) {
        total[total.length - 1] = {
          content: [
            ...total[total.length - 1].content,
            <NavItem key={0} {...ele} noLink={type === "year"} />
          ]
        };
        return total;
      }
      return [
        ...total,
        {
          content: [<NavItem key={1} {...ele} noLink={type === "year"} />]
        }
      ];
    }, []);
  };
  get type() {
    const {
      match: {
        params: { type }
      }
    } = this.props;
    return type;
  }

  TabList = [
    { content: "日报", id: "day", to: "/speproject/tech/day" },
    { content: "月报", id: "month", to: "/speproject/tech/month" },
    { content: "年报", id: "year", to: "/speproject/tech/year" }
  ];
  render() {
    const { onDateChange, showCalendar, type, TabList } = this;
    const { currentDate, calenderView } = this.state;
    return (
      <>
        {calenderView && (
          <Calendar
            onChange={this.onDateChange}
            onCancel={this.hideCalendar}
            maxDate={endDateObj[type]}
            defaultValue={currentDate}
            type={type}
          />
        )}
        <Header>
          <Tab activeId={type} list={TabList} />
          <CalendarView onClick={showCalendar}>
            {this.getDateStr(currentDate)} <CalendarIcon /> | 总院
          </CalendarView>

          <ArcDatePicker
            onChange={onDateChange}
            date={currentDate}
            endDate={endDateObj[type]}
            type={type}
          />
        </Header>
        {this.content}
        {!this.noPointer && <LinePointer>当天凌晨4点更新昨天数据</LinePointer>}
      </>
    );
  }
}

export default DateSelectPageTemplate;
