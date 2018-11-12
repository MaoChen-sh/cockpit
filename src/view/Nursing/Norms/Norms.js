import React, { PureComponent } from "react";
import styled from "styled-components";
import { ArcDatePicker, TableTemp as Table } from "view/components";
import normsData from "./normsData";
import { Header, Tab as TabBase, BlockArea, Calendar, Rate } from "components";
import { getYMD } from "tools";

const CalendarView = styled.div`
  position: absolute;
  top: 90px;
  left: 50%;
  transform: translate(-50%);
  color: #fff;
  z-index: 4;
  display: inline-block;
  font-size: 14px;
`;
const Tab = styled(TabBase)`
  padding: 14px 3.2vw;
  li {
    width: 28.8vw;
    height: 30px;
    background: #fff;
    border-radius: 15px;
    font-size: 14px;
    color: #999999;
    &.active {
      background: #0d86e8;
      color: #fff;
    }
  }
`;
const now = new Date(new Date().toLocaleDateString());
const endDate = (type => {
  let [year, month, day] = getYMD(now);
  month = month - 1;
  if (day < 2) {
    month = month - 1;
    if (month === -1) {
      year = year - 1;
    }
  }
  return new Date(`${year}/${month}/1`);
})();
class Norms extends PureComponent {
  constructor(props) {
    super(props);
    this.get_listData();
    this.state = {
      currentDate: endDate,
      calenderView: false,
      listData: []
    };
  }

  get dateStr() {
    const { currentDate: date } = this.state;
    const [y, m] = getYMD(date);
    return `${y}年${m}月`;
  }
  get childList() {
    const {
      params: { norm }
    } = this.props.match;
    return normsData[norm].children;
  }

  get_listData = () => {
    const {
      params: { norm, childNorm }
    } = this.props.match;
    const { childList } = this;
    setTimeout(() =>
      this.setState({
        listData: childList
          ? childList[childNorm].testData.map((ele, index) => ({
              ...ele,
              id: index
            }))
          : normsData[norm].testData.map((ele, index) => ({
              ...ele,
              id: index
            }))
      })
    );
  };

  onDateChange = date => {
    // this.get_data(date);
    console.log(date);
    this.setState({
      currentDate: date,
      calenderView: false
    });
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
  render() {
    const { onDateChange, childList } = this;
    const { currentDate, calenderView, listData } = this.state;
    const {
      params: { norm, childNorm }
    } = this.props.match;
    return (
      <div>
        {calenderView && (
          <Calendar
            onChange={onDateChange}
            onCancel={this.hideCalendar}
            maxDate={endDate}
            defaultValue={currentDate}
            type="month"
          />
        )}
        <Header defaultStyles={`margin-top: -66px;`}>
          <CalendarView onClick={this.showCalendar}>
            {this.dateStr}
          </CalendarView>
          <ArcDatePicker
            onChange={onDateChange}
            date={currentDate}
            endDate={endDate}
            type="month"
          />
        </Header>
        {childList && (
          <Tab
            activeId={childNorm}
            list={Object.entries(childList).map(ele => ({
              content: ele[1].title,
              id: ele[0],
              to: `/nursing/${norm}/${ele[0]}`
            }))}
          />
        )}
        <BlockArea>
          <Table
            defaultStyles={`
              th{
                white-space: nowrap;
              }
              td:first-child{
                font-size:10px;
                color: '#4a4a4a'
              }
              th,td{
                padding-right:  10px
              }
            `}
            data={listData}
            columns={[
              { title: "指标", render: ele => ele.name, id: 0 },
              {
                title: "环比数据",
                render: ele => <Rate value={Math.random()}> </Rate>,
                id: 1
              },
              {
                title: "结果",
                render: ele => (Math.random() / 10).toFixed(2) + "%",
                id: 2
              }
            ]}
          />
        </BlockArea>
      </div>
    );
  }
}

Norms.propTypes = {};

export default Norms;
