import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ArcDate } from "components";
const oneDay = 24 * 3600 * 1000;
const endDay = new Date() - oneDay;
class ArcDatePicker extends PureComponent {
  constructor(props) {
    super(props);
    const { type, onChange, value } = props;
    onChange(value, this.getDateText(value, type));
  }
  componentWillReceiveProps(nextProps) {
    const { type } = this.props;
    const { type: nextType, value: nextValue, onChange } = nextProps;
    if (nextType !== type) {
      const dateText = this.getDateText(0, nextType);
      onChange(nextValue, dateText);
    }
  }
  getDateList = (finalIndex, length, type, passedCount = 0) => {
    const endD = new Date(endDay);
    let [year, month, day] = [
      endD.getFullYear(),
      endD.getMonth() + 1,
      endD.getDate()
    ];
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
  onDateChange = value => {
    const { type, onChange } = this.props;
    const dateText = this.getDateText(value, type);
    onChange(value, dateText);
  };
  getDateText = (value, type) => {
    const endD = new Date(endDay);
    let [year, month, day] = [
      endD.getFullYear(),
      endD.getMonth() + 1,
      endD.getDate()
    ];
    switch (type) {
      case "month":
        month = month - 1;
        if (day < 2) {
          month = month - 1;
        }
        const m = +month + value;
        return `${+year + parseInt(m / 12)}年${12 + ((m - 12) % 12)}月`;
      case "year":
        year = year - 1;
        if (day < 2 && month === 1) {
          year = year - 1;
        }
        return `${year + value}年`;
      default:
        let newDate = new Date(endDay + value * oneDay);
        let [newY, newM, newD] = [
          newDate.getFullYear(),
          newDate.getMonth() + 1,
          newDate.getDate()
        ];
        return `${newY}年${newM}月${newD}日`;
    }
  };
  render() {
    const { onDateChange, getDateList } = this;
    const { value, type } = this.props;
    return (
      <ArcDate
        onChange={onDateChange}
        selectedValue={value}
        computedSetting={{
          getDataList: getDateList,
          page: 0
        }}
        type={type}
      />
    );
  }
}

ArcDatePicker.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number
};

export default ArcDatePicker;
