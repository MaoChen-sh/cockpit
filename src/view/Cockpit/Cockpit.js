import React, { Component } from "react";
import PropTypes from "prop-types";
import { ArcDate, Tab } from "components";

const propTypes = {};
const oneDay = 24 * 3600 * 1000;

const getDateList = (endDay, length, type) => {
  if (type === "month") {
    const endM = new Date(endDay).getMonth() + 1;
    const endY = new Date(endDay).getYear();

    return Array(length)
      .fill("")
      .map((ele, index) => {
        let y = endY + 1900;
        let m = endM - index;
        y += Math.floor(m / 12);
        if (m <= 0) {
          m = 12 + Math.floor(m % 12);
        } else {
          m = 0 + Math.floor(m % 12);
        }
        return new Date(`${y}/${m}/1`).valueOf();
      })
      .reverse();
  }
  if (type === "year") {
    return () => {};
  }
  return Array(length)
    .fill("")
    .map((ele, index) => {
      return endDay - oneDay * index;
    })
    .reverse();
};
class Cockpit extends Component {
  constructor(props) {
    super();
    this.state = {
      currentDate: this.getDefaultCurrentDate(props.match.params.type),
      arcDateComputedSetting: {}
    };
  }

  getDefaultCurrentDate = type => {
    const today = new Date().toLocaleDateString();

    switch (type) {
      case "month":
        let [year, month, day] = today.match(/\d+/g);
        month = day >= 2 ? month - 1 : month - 2;
        if (month < 0) {
          month = 12 - month;
          year -= 1;
        }
        console.log(`${year}/${month}/${1}`, "===");
        return new Date(`${year}/${month}/${1}`).valueOf();
      case "year":
        return new Date(today).valueOf() - oneDay;
      default:
        return new Date(today).valueOf() - oneDay;
    }
  };

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
        currentDate: this.getDefaultCurrentDate(nextType),
        arcDateComputedSetting: this.getComputedSetting(nextType)
      });
    }
  }

  onDateChange = date => {
    console.log(new Date(date).toLocaleString());
    this.setState({
      currentDate: date
    });
  };

  getDateList = (endDay, length, type) => {
    if (type === "month") {
      const endM = new Date(endDay).getMonth() + 1;
      const endY = new Date(endDay).getYear();
      return Array(length)
        .fill("")
        .map((ele, index) => {
          let y = endY + 1900;
          let m = endM - index;
          y += Math.floor(m / 12);
          if (m <= 0) {
            m = 12 + Math.floor(m % 12);
          } else {
            m = 0 + Math.floor(m % 12);
          }
          return new Date(`${y}/${m}/1`);
        })
        .reverse();
    }
    if (type === "year") {
      return () => {};
    }
    return Array(length)
      .fill("")
      .map((ele, index) => {
        return endDay - oneDay * index;
      })
      .reverse();
  };
  getComputedSetting = type => {
    const endDateStr = new Date().toLocaleDateString();
    let finalDate;
    let [year, month, day] = endDateStr.match(/\d+/g);
    switch (type) {
      case "month":
        month = (day >= 2 ? month - 1 : month - 2) + 11;
        if (month > 12) {
          month = month - 12;
          year = +year + 1;
        }
        finalDate = new Date(`${year}/${month}/${1}`).valueOf();
        return {
          finalDate: finalDate,
          lastDate: finalDate // 当前最后日期
        };
      case "year":
        finalDate = new Date(`${year + 10}/1/1`).valueOf();
        return {
          finalDate: finalDate,
          lastDate: finalDate // 当前最后日期
        };
      default:
        finalDate = new Date(endDateStr).valueOf() + 10 * oneDay;
        return {
          finalDate: finalDate,
          lastDate: finalDate
        };
    }
  };
  render() {
    const {
      match: {
        params: { type }
      }
    } = this.props;
    console.log(type);
    return (
      <div>
        <ArcDate
          onChange={this.onDateChange}
          selectedDate={this.state.currentDate}
          computedSetting={{
            getDateList: getDateList,
            ...this.getComputedSetting(type)
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
        </ArcDate>
      </div>
    );
  }
}

Cockpit.propTypes = propTypes;

export default Cockpit;
