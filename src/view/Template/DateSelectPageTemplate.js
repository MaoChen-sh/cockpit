import React, { PureComponent } from "react";
import {
  Header,
  Tab,
  LinePointer,
  Calendar,
  CompanySelector as CompanySelectorModal
} from "components";
import { NavItem, ArcDatePicker } from "view/components";
import { ReactComponent as CalendarIconBase } from "static/svg/calendar.svg";
import { ReactComponent as SelectIcon } from "static/svg/select.svg";

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
  white-space: nowrap;
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
const CompanySelector = styled.span`
  font-size: 14px;
  color: #ffffff;
  padding-left: 10px;
  border-left: 1px solid #fff;
  line-height: 14px;
  display: inline-block;
  margin-left: 10px;
  & > svg {
    vertical-align: middle;
    margin-left: 6px;
    width: 8px;
    height: 8px;
    path {
      fill: #fff;
    }
  }
`;
const now = new Date(new Date().toLocaleDateString());
const endDateObj = (() => {
  let [year, month, day] = getYMD(now);
  month = month - 1;
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
    year: new Date(`${month === 12 ? year : year - 1}/1/1`),
    month: new Date(`${year}/${month}/1`),
    day: new Date(now - 24 * 3600000)
  };
})();

const companyList = [
  {
    content: "总院",
    id: 0
  },
  {
    content: "分院A",
    id: 1
  },
  {
    content: "分院B",
    id: 2
  },
  {
    content: "分院C",
    id: 3
  },
  {
    content: "分院D",
    id: 4
  },
  {
    content: "分院E",
    id: 5
  }
];
class DateSelectPageTemplate extends PureComponent {
  constructor(props) {
    super(props);
    const { type } = this;
    this.state = {
      currentDate: endDateObj[type],
      type: type,
      calenderView: false
    };
  }
  get type() {
    const {
      match: {
        params: { type }
      }
    } = this.props;
    return type;
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
    const { onDateChangeCall } = this;
    onDateChangeCall && onDateChangeCall(date);
    this.setState({
      currentDate: date,
      calenderView: false,
      companySelectorView: false
    });
  };

  reduceNavItem = list => {
    const { type } = this;
    return list.reduce((total, ele, index) => {
      if (index % 2) {
        total[total.length - 1] = {
          content: [
            ...total[total.length - 1].content,
            <NavItem key={0} noLink={type === "year"} {...ele} />
          ]
        };
        return total;
      }
      return [
        ...total,
        {
          content: [<NavItem key={1} noLink={type === "year"} {...ele} />]
        }
      ];
    }, []);
  };

  TabList = [
    { content: "日报", id: "day", to: "/speproject/tech/day" },
    { content: "月报", id: "month", to: "/speproject/tech/month" },
    { content: "年报", id: "year", to: "/speproject/tech/year" }
  ];
  showCompanySelector = e => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({
      companySelectorView: true
    });
  };
  hideCompanySelector = () => {
    this.setState({
      companySelectorView: false
    });
  };
  onCompanyChange = id => {
    this.setState({
      currentCompany: id,
      companySelectorView: false
    });
  };
  componentWillUpdate(nextProps, nextState) {
    const { calenderView, companySelectorView } = nextState;
    if (calenderView || companySelectorView) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  }

  render() {
    const {
      onDateChange,
      showCalendar,
      hideCalendar,
      type,
      TabList,
      onCompanyChange,
      showCompanySelector,
      hideCompanySelector
    } = this;
    const {
      currentDate,
      calenderView,
      companySelectorView,
      currentCompany
    } = this.state;

    return (
      <>
        {calenderView && (
          <Calendar
            onChange={onDateChange}
            onCancel={hideCalendar}
            maxDate={endDateObj[type]}
            defaultValue={currentDate}
            type={type}
          />
        )}
        {companySelectorView && (
          <CompanySelectorModal
            onChange={onCompanyChange}
            onCancel={hideCompanySelector}
            defaultValue={String(companyList[0].id)}
            list={companyList}
            title={"选择院区"}
          />
        )}
        <Header defaultStyles={!TabList ? `margin-top: -66px;` : ""}>
          {TabList && <Tab activeId={type} list={TabList} />}
          <CalendarView
            onClick={showCalendar}
            style={!TabList ? { top: "90px" } : {}}
          >
            {this.getDateStr(currentDate)} <CalendarIcon />
            <CompanySelector onClick={showCompanySelector}>
              {companyList[currentCompany || 0].content}
              <SelectIcon />
            </CompanySelector>
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
