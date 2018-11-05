import React, { Component } from "react";
import {
  Header,
  Tab,
  BlockArea as BlockAreaBase,
  List as ListBase,
  Chart as ChartBase,
  RightArrow,
  Calendar
} from "components";
import { NavItem, ArcDatePicker } from "./components";
import styled from "styled-components";
import { ReactComponent as outpatient_and_emerg } from "static/svg/outpatient_and_emerg.svg";
import { ReactComponent as operation } from "static/svg/operation.svg";
import { ReactComponent as physical_examination } from "static/svg/physical_examination.svg";
import { ReactComponent as admission_number } from "static/svg/admission_number.svg";
import { ReactComponent as in_the_hospital } from "static/svg/in_the_hospital.svg";
import { ReactComponent as discharge_number } from "static/svg/discharge_number.svg";
import { $fetch, apis } from "config";
import { getDateParamsFromDate, getYMD } from "tools";
import { Link } from "react-router-dom";

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

const NavList = styled(ListBase)`
  & > li {
    display: flex;
    justify-content: space-around;
  }
`;

const Chart = styled(ChartBase)`
  margin: 8px auto;
  width: 50%;
  height: 120px;
`;

const IncomeBox = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 12px 0;
  width: 100%;
`;
const IncomeLeft = styled.div`
  color: #4a4a4a;
  &::before {
    content: "";
    display: inline-block;
    background: ${p => p.color};
    width: 9px;
    height: 9px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
const IncomeRight = styled.div`
  color: #333333;
  display: flex;
  align-items: center;
  & > span {
    margin-right: 10px;
    font-weight: bold;
  }
`;

const IncomeItem = ({ color, title, money, to }) => (
  <IncomeBox to={to}>
    <IncomeLeft color={color}>{title}</IncomeLeft>
    <IncomeRight>
      <span>{money && `￥${money}`}</span>
      <RightArrow />
    </IncomeRight>
  </IncomeBox>
);

const BlockArea = styled(BlockAreaBase)`
  & > h2 {
    color: #4a4a4a;
  }
`;
const Pointer = styled.div`
  color: #999;
  font-size: 10px;
  position: relative;
  text-align: center;
  width: 95%;
  margin: 15px auto;
  &::before {
    content: "";
    position: absolute;
    height: 2px;
    background: #ccc;
    top: 0;
    left: 10px;
    bottom: 0;
    right: 10px;
    margin: auto 0;
    display: block;
  }
  & > span {
    position: relative;
    z-index: 2;
    background: #f5f5f5;
    display: inline-block;
    padding: 0 10px;
  }
`;
const now = new Date(new Date().toLocaleDateString());
const endDateObj = (type => {
  let [year, month, day] = getYMD(now);
  month = month - 1;
  if (day < 2) {
    month = month - 1;
    if (month === -1) {
      year = year - 1;
    }
  }
  return {
    year: new Date(`${year - 1}/1/1`),
    month: new Date(`${year}/${month}/1`),
    day: new Date(now - 24 * 3600000)
  };
})();

class Cockpit extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { type }
      }
    } = props;
    this.state = {
      currentDate: endDateObj[type],
      counts: {},
      inCome: {},
      calenderView: false
    };
  }

  componentDidMount() {
    const { currentDate } = this.state;
    this.get_data(currentDate);
  }

  get_data = date => {
    const {
      match: {
        params: { type }
      }
    } = this.props;
    const params = getDateParamsFromDate(date, type);
    this.get_overall(params);
    this.get_income(params);
  };

  get_overall = params => {
    $fetch
      .get(apis.overall.index, {
        params
      })
      .then(res => {
        const {
          hospitalizedPatients,
          medicalExam,
          medicalIncome,
          medicalTech,
          outpatientVolume,
          surgery
        } = res.result || {};
        this.setState({
          counts: {
            outpatientVolume: outpatientVolume
              ? outpatientVolume.totalEmergencyVisits
              : 0, // 门急诊人次
            surgery: surgery ? surgery.totalSurgery : 0, // 手术台数
            medicalExam: medicalExam ? medicalExam.totalMedicalExamination : 0, // 体检人数
            medicalIncome: medicalIncome ? medicalIncome.totalIncome : 0, //  医疗总收入
            medicalTech: medicalTech
              ? medicalTech.totalMedicalTech
              : medicalTech, // 	总医技数
            hospitalizedPatients: hospitalizedPatients
              ? hospitalizedPatients.hosipotial
              : 0 // 在院人数
          }
        });
      })
      .catch(error => console.error(error));
  };

  get_income = params => {
    $fetch
      .get(apis.overall.medical_income, { params })
      .then(res => {
        const { medicalIncome, outpatientHospitalIncome, drugIncome } =
          res.result || {};
        this.setState({
          inCome: {
            total: medicalIncome ? medicalIncome.totalIncome : 0,
            inHospital: outpatientHospitalIncome
              ? outpatientHospitalIncome.inHospitalIncome
              : 0,
            unInHospital: outpatientHospitalIncome
              ? outpatientHospitalIncome.outpatientEmergencyIncome
              : 0,
            drug: drugIncome ? drugIncome.drugIncome : 0,
            nonDrug: drugIncome ? drugIncome.nonDrugIncome : 0
          }
        });
      })
      .catch(error => console.error(error));
  };

  onDateChange = date => {
    this.get_data(date);
    console.log(date)
    this.setState({
      currentDate: date,
      calenderView: false
    });
  };

  reduceNavItem = list => {
    return list.reduce((total, ele, index) => {
      if (index % 2) {
        total[total.length - 1] = {
          content: [
            ...total[total.length - 1].content,
            <NavItem key={0} {...ele} />
          ]
        };
        return total;
      }
      return [
        ...total,
        {
          content: [<NavItem key={1} {...ele} />]
        }
      ];
    }, []);
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

  getDateStr = date => {
    const [y, m, d] = getYMD(date);
    const {
      match: {
        params: { type }
      }
    } = this.props;
    switch (type) {
      case "year":
        return `${y}年`;
      case "month":
        return `${y}年${m}月`;
      default:
        return `${y}年${m}月${d}日`;
    }
  };
  render() {
    const { props, state, onDateChange, reduceNavItem } = this;
    const {
      currentDate,
      counts: { hospitalizedPatients, medicalExam, outpatientVolume, surgery },
      inCome: { total, inHospital, unInHospital, drug, nonDrug },
      calenderView
    } = state;
    const {
      match: {
        params: { type }
      }
    } = props;
    const params = getDateParamsFromDate(currentDate, type);
    const searchs = Object.entries(params)
      .map(ele => ele.join("="))
      .join("&");
    return (
      <div>
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
          <Tab
            activeId={type}
            list={[
              { content: "日报", id: "day", to: "/cockpit/home/day" },
              { content: "月报", id: "month", to: "/cockpit/home/month" },
              { content: "年报", id: "year", to: "/cockpit/home/year" }
            ]}
          />
          <CalendarView onClick={this.showCalendar} >
            {this.getDateStr(currentDate)}
          </CalendarView>

          <ArcDatePicker
            onChange={onDateChange}
            date={currentDate}
            endDate={endDateObj[type]}
            type={type}
          />
        </Header>

        <BlockArea title={"重点业务分析"}>
          <NavList
            list={reduceNavItem(
              [
                {
                  svg: outpatient_and_emerg,
                  title: "门急诊人次",
                  count: outpatientVolume,
                  to: "/cockpit/outpatient"
                },
                {
                  svg: operation,
                  title: "手术台数",
                  count: surgery,
                  to: "/cockpit/surgery"
                },
                {
                  svg: physical_examination,
                  title: "体检人数",
                  count: medicalExam,
                  to: "/cockpit/bodycheck"
                },
                {
                  svg: admission_number,
                  title: "入院人数",
                  count: 34,
                  to: "/cockpit/enterhospital"
                },
                {
                  svg: in_the_hospital,
                  title: "在院人数",
                  count: hospitalizedPatients,
                  to: "/cockpit/inhospital"
                },
                {
                  svg: discharge_number,
                  title: "出院人数",
                  count: 34,
                  to: "/cockpit/leavehospital"
                }
              ].map(ele => ({
                ...ele,
                to: { pathname: ele.to, search: searchs }
              }))
            )}
          />
        </BlockArea>
        <BlockArea title={"收入分析"}>
          <Chart
            options={{
              color: ["#24b1f3", "#f27b7f"],
              series: [
                {
                  type: "pie",
                  radius: ["50%", "90%"],
                  center: ["50%", "50%"],
                  selectedMode: "single",
                  label: {
                    show: false
                  },
                  data: [
                    { value: unInHospital, name: "门急诊收入" },
                    { value: inHospital, name: "住院收入" }
                  ]
                }
              ]
            }}
          />
          <Chart
            options={{
              color: ["#FFB54F", "#23d7bd"],
              series: [
                {
                  type: "pie",
                  radius: ["50%", "90%"],
                  center: ["50%", "50%"],
                  selectedMode: "single",
                  label: {
                    show: false
                  },
                  data: [
                    { value: nonDrug, name: "非药品收入" },
                    { value: drug, name: "药品收入" }
                  ]
                }
              ]
            }}
          />
          <ListBase
            list={[
              {
                title: "医疗总收入",
                money: total,
                to: "/cockpit/income/total"
              },
              {
                title: "门急诊收入",
                color: "#24B1F3",
                money: unInHospital,
                to: "/cockpit/income/uninhospital"
              },
              {
                title: "住院收入",
                color: "#f27b7f",
                money: inHospital,
                to: "/cockpit/income/inhospital"
              },
              {
                title: "非药品收入",
                color: "#4a4a4a",
                money: nonDrug,
                to: "/cockpit/income/nondrug"
              },
              {
                title: "药品收入",
                color: "#23d7bd",
                money: drug,
                to: "/cockpit/income/drug"
              }
            ].map(ele => ({
              content: <IncomeItem {...ele} />
            }))}
          />
        </BlockArea>
        <Pointer>
          <span>当天凌晨4点更新昨天数据</span>
        </Pointer>
      </div>
    );
  }
}

export default Cockpit;
