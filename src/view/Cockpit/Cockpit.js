import React, { Component } from "react";
import PropTypes from "prop-types";
import { ArcDate, Tab, BlockArea, List as ListBase } from "components";
import { NavItem } from "./components";
import styled from "styled-components";
import { ReactComponent as outpatient_and_emerg } from "static/svg/outpatient_and_emerg.svg";
import { ReactComponent as operation } from "static/svg/operation.svg";
import { ReactComponent as physical_examination } from "static/svg/physical_examination.svg";
import { ReactComponent as admission_number } from "static/svg/admission_number.svg";
import { ReactComponent as in_the_hospital } from "static/svg/in_the_hospital.svg";
import { ReactComponent as discharge_number } from "static/svg/discharge_number.svg";

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
const DateInput = styled.input`
  position: absolute;
  top: 67px;
  left: 50%;
  transform: translate(-50%);
  color: #fff;
  z-index: 4;
  display: inline-block;
  font-size: 14px;
`;

const NavList = styled(ListBase)`
  & > li {
    display: flex;
    justify-content: space-around;
  }
`;
const Svg = Component => <Component />;

const propTypes = {};
const oneDay = 24 * 3600 * 1000;
const endDay = new Date() - oneDay;

class Calendar extends React.PureComponent {
  render() {
    const { label, date } = this.props;
    return <CalendarView>{label}</CalendarView>;
  }
}
class Cockpit extends Component {
  constructor() {
    super();
    this.state = {
      currentValue: 0
    };
  }
  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { type }
      }
    } = this.props;
    const {
      match: {
        params: { type: nextType }
      }
    } = nextProps;
    if (nextType !== type) {
      this.setState({
        currentValue: 0
      });
    }
  }

  onDateChange = value => {
    this.setState({
      currentValue: value
    });
  };

  getDateList = (finalIndex, length, type, passedCount = 0) => {
    let [year, month, day] = new Date(endDay)
      .toLocaleDateString()
      .match(/\d+/g);

    year = year - 1;
    month = month - 1;
    if (day < 2) {
      month = month - 1;
      if (month === -1) {
        year = year - 1;
      }
    }
    return Array(length)
      .fill("")
      .map((ele, index) => {
        const value = index - finalIndex + passedCount;
        switch (type) {
          case "month":
            return {
              value: value,
              label: 12 + ((month + value - 12) % 12)
            };
          case "year":
            return {
              value: value,
              label: year + value
            };
          default:
            return {
              value: value,
              label: new Date(endDay + value * oneDay).getDate()
            };
        }
      });
  };

  getDateText = (currentValue, type) => {
    let [year, month, day] = new Date(endDay)
      .toLocaleDateString()
      .match(/\d+/g);

    switch (type) {
      case "month":
        month = month - 1;
        if (day < 2) {
          month = month - 1;
        }
        const m = +month + currentValue;
        return `${+year + parseInt(m / 12)}年${12 + ((m - 12) % 12)}月`;
      case "year":
        year = year - 1;
        if (day < 2 && month === 1) {
          year = year - 1;
        }
        return `${year}年`;
      default:
        return new Date(endDay + currentValue * oneDay)
          .toLocaleDateString()
          .replace(/(\d+).(\d+).(\d+)/, "$1年$2月$3日");
    }
  };

  reduceNavItem = list => {
    return list.reduce((total, ele, index) => {
      if (index % 2) {
        total[total.length - 1] = {
          content: [...total[total.length - 1].content, <NavItem {...ele} />]
        };
        return total;
      }
      return [
        ...total,
        {
          content: [<NavItem {...ele} />]
        }
      ];
    }, []);
  };
  render() {
    const {
      props,
      state,
      onDateChange,
      getDateText,
      getDateList,
      reduceNavItem
    } = this;
    const { currentValue } = state;
    const {
      match: {
        params: { type }
      }
    } = props;
    console.log(type);
    return (
      <div>
        <ArcDate
          onChange={onDateChange}
          selectedValue={currentValue}
          computedSetting={{
            getDataList: getDateList,
            page: 0
          }}
          type={type}
        >
          <Tab
            activeId={type}
            list={[
              { content: "日报", id: "day", to: "/cockpit/day" },
              { content: "月报", id: "month", to: "/cockpit/month" },
              { content: "年报", id: "year", to: "/cockpit/year" }
            ]}
          />
          {/* <DateInput type="date" /> */}
          <Calendar label={getDateText(currentValue, type)} />
        </ArcDate>

        <BlockArea title={"重点业务分析"}>
          <NavList
            list={reduceNavItem([
              {
                svg: outpatient_and_emerg,
                title: "门急诊人次",
                count: 1098,
                to: ""
              },
              {
                svg: operation,
                title: "手术台数",
                count: 34,
                to: ""
              },
              {
                svg: physical_examination,
                title: "体检人数",
                count: 34,
                to: ""
              },
              {
                svg: admission_number,
                title: "入院人数",
                count: 34,
                to: ""
              },
              {
                svg: in_the_hospital,
                title: "在院人数",
                count: 34,
                to: ""
              },
              {
                svg: discharge_number,
                title: "出院人数",
                count: 34,
                to: ""
              }
            ])}
          />
        </BlockArea>
        <BlockArea title={"收入分析"}>
          <ListBase list={[]} />
        </BlockArea>
      </div>
    );
  }
}

Cockpit.propTypes = propTypes;

export default Cockpit;
