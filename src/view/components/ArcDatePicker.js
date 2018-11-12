import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ArcData } from "components";
import { getYMD } from "tools";

const oneDay = 24 * 3600000;
class ArcDatePicker extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { type } = this.props;
    const { type: nextType, onChange, endDate: nextEndDate } = nextProps;
    if (nextType !== type) {
      onChange(nextEndDate);
    }
  }

  getDateList = (finalIndex, length, type, passedCount = 0) => {
    const { endDate } = this.props;
    let [year, month] = getYMD(endDate);
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
              label: new Date(endDate.valueOf() + value * oneDay).getDate()
            };
        }
      });
  };
  onDateChange = value => {
    const { type, onChange } = this.props;
    const date = this.getDateFromValue(value, type);
    onChange(date);

  };

  getDateFromValue = (value, type) => {
    const { endDate } = this.props;

    let [year, month] = getYMD(endDate);
    switch (type) {
      case "month":
        const m = +month + value;
        return new Date(
          `${+year + Math.floor(m / 12)}/${12 + ((m - 12) % 12)}/1`
        );
      case "year":
        return new Date(`${year + value}/1/1`);
      default:
        return new Date(endDate.valueOf() + value * oneDay);
    }
  };

  getValueFromDate = (date, type) => {
    const { endDate } = this.props;
    let [year, month] = getYMD(endDate);
    let [vYear, vMonth] = getYMD(date);

    switch (type) {
      case "month":
        return (vYear - year) * 12 + (vMonth - month);
      case "year":
        return vYear - year;
      default:
        return parseInt((date.valueOf() - endDate.valueOf()) / oneDay);
    }
  };
  render() {
    const { onDateChange, getDateList } = this;
    const { date, type } = this.props;
    return (
      <ArcData
        onChange={onDateChange}
        selectedValue={this.getValueFromDate(date, type)}
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
  date: PropTypes.object
};

export default ArcDatePicker;
