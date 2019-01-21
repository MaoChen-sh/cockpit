import React, { Component } from "react";
import {
  Header,
  Tab,
  BlockArea as BlockAreaBase,
  List as ListBase,
  Chart as ChartBase,
  RightArrow,
  Calendar,
  Rate,
  LinePointer
} from "components";
import {
  NavItem,
  ArcDatePicker,
  TableTemp as TableBase
} from "view/components";
import styled from "styled-components";
import { ReactComponent as outpatient_and_emerg } from "static/svg/outpatient_and_emerg.svg";
import { ReactComponent as operation } from "static/svg/operation.svg";
import { ReactComponent as physical_examination } from "static/svg/physical_examination.svg";
import { ReactComponent as admission_number } from "static/svg/admission_number.svg";
import { ReactComponent as in_the_hospital } from "static/svg/in_the_hospital.svg";
import { ReactComponent as discharge_number } from "static/svg/discharge_number.svg";
import { $fetch, apis } from "config";
import { getDateParamsFromDate, getYMD } from "tools";

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

const IncomeLeft = styled.div`
  color: #4a4a4a;
  width: 90px;
  margin-right: 16px;
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
  justify-content: flex-end;
  flex-grow: 1;
  & > span {
    margin-right: 10px;
    font-weight: bold;
  }
`;

const BlockArea = styled(BlockAreaBase)`
  & > h2 {
    color: #4a4a4a;
  }
`;
const Table = styled(TableBase)`
  tbody > tr td:first-child {
    padding-left: 0;
  }
  tbody > tr td:last-child {
    padding-right: 0;
  }
`;
const now = new Date(new Date().toLocaleDateString());
const endDateObj = (type => {
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
      counts: {
        outpatientVolume: {},
        surgery: {},
        medicalExam: {},
        admissions: {},
        recover: {},
        hospitalizedPatients: {}
      },
      inCome: {
        total: {},
        inHospital: {},
        unInHospital: {},
        drug: {},
        nonDrug: {}
      },
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
    Promise.all([this.get_overall(params), this.get_income(params)])
      .then(res =>
        this.setState({
          ...res[0],
          ...res[1]
        })
      )
      .catch(error => console.error(error));
  };
  getValueRate = (obj, valueKey, rateKey) => {
    return obj
      ? {
          value: obj[valueKey],
          rate: obj[rateKey]
        }
      : {};
  };
  get_overall = params => {
    const { getValueRate } = this;
    return $fetch
      .get(apis.overall.index, {
        params
      })
      .then(result => {
        const {
          hospitalizedPatients,
          medicalExam,
          admissions,
          recover,
          outpatientVolume,
          surgery
        } = result;
        return {
          counts: {
            // 门急诊人次
            outpatientVolume: getValueRate(
              outpatientVolume,
              "totalEmergencyVisits",
              "emergencyVisitsRate"
            ),
            // 手术台数
            surgery: getValueRate(surgery, "totalSurgery", "surgeryRate"),
            // 体检人数
            medicalExam: getValueRate(
              medicalExam,
              "totalMedicalExamination",
              "medicalExaminationRate"
            ),
            // 入院人数
            admissions: getValueRate(
              admissions,
              "admissions",
              "admissionsRate"
            ),
            // 在院人数
            hospitalizedPatients: getValueRate(
              hospitalizedPatients,
              "hosipotial",
              "hosipotialRate"
            ),
            // 出院人数
            recover: getValueRate(recover, "recover", "recoverRate")
          }
        };
      });
  };

  get_income = params => {
    const { getValueRate } = this;
    return $fetch.get(apis.overall.medical_income, { params }).then(result => {
      const { medicalIncome, outpatientHospitalIncome, drugIncome } = result;
      return {
        inCome: {
          total: getValueRate(medicalIncome, "totalIncome", "inComeRate"),
          inHospital: getValueRate(
            outpatientHospitalIncome,
            "inHospitalIncome",
            "inHospitalRate"
          ),
          unInHospital: getValueRate(
            outpatientHospitalIncome,
            "outpatientEmergencyIncome",
            "outpatientEmergencyRate"
          ),
          drug: getValueRate(drugIncome, "drugIncome", "drugRate"),
          nonDrug: getValueRate(drugIncome, "nonDrugIncome", "nonDrugRate")
        }
      };
    });
  };

  onDateChange = date => {
    this.get_data(date);
    this.setState({
      currentDate: date,
      calenderView: false
    });
  };

  reduceNavItem = list => {
    const {
      match: {
        params: { type }
      }
    } = this.props;
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

  get hospitalChartData() {
    const {
      inCome: { inHospital, unInHospital }
    } = this.state;
    return [
      { value: unInHospital.value, name: "门急诊收入" },
      { value: inHospital.value, name: "住院收入" }
    ];
  }
  getHospitalChartOption = data => ({
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
        data: data
      }
    ]
  });

  get drugChartData() {
    const {
      inCome: { drug, nonDrug }
    } = this.state;
    return [
      { value: nonDrug.value, name: "非药品收入" },
      { value: drug.value, name: "药品收入" }
    ];
  }

  getDrugChartOption = data => ({
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
        data: data
      }
    ]
  });
  animationEndCallBack;

  onAnimationEndCallBack = () => {
    typeof this.animationEndCallBack === "function" &&
      this.animationEndCallBack();
  };

  render() {
    const { props, state, onDateChange, reduceNavItem } = this;
    const {
      currentDate,
      counts: {
        hospitalizedPatients,
        medicalExam,
        outpatientVolume,
        surgery,
        admissions,
        recover
      },
      inCome: { total, inHospital, unInHospital, drug, nonDrug },
      calenderView,
      onAnimationEndCallBack
    } = state;
    const {
      match: {
        params: { type }
      }
    } = props;
    const params = getDateParamsFromDate(currentDate, type);
    const searchs =
      Object.entries(params)
        .map(ele => ele.join("="))
        .join("&") +
      "&type=" +
      type;
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
          <CalendarView onClick={this.showCalendar}>
            {this.getDateStr(currentDate)}
          </CalendarView>

          <ArcDatePicker
            onAnimationEndCallBack={onAnimationEndCallBack}
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
                  count: outpatientVolume.value,
                  rate: outpatientVolume.rate,
                  to: "/cockpit/outpatient"
                },
                {
                  svg: operation,
                  title: "手术台数",
                  count: surgery.value,
                  rate: surgery.rate,
                  to: "/cockpit/surgery"
                },
                {
                  svg: physical_examination,
                  title: "体检人数",
                  count: medicalExam.value,
                  rate: medicalExam.rate,
                  to: "/cockpit/bodycheck"
                },
                {
                  svg: admission_number,
                  title: "入院人数",
                  count: admissions.value,
                  rate: admissions.rate,
                  to: "/cockpit/hospital/enter"
                },
                {
                  svg: in_the_hospital,
                  title: "在院人数",
                  count: hospitalizedPatients.value,
                  rate: hospitalizedPatients.rate,
                  to: "/cockpit/hospital/in"
                },
                {
                  svg: discharge_number,
                  title: "出院人数",
                  count: recover.value,
                  rate: recover.rate,
                  to: "/cockpit/hospital/leave"
                }
              ].map(ele => ({
                ...ele,
                to: type === "year" ? "" : { pathname: ele.to, search: searchs }
              }))
            )}
          />
        </BlockArea>
        <BlockArea title={"收入分析"}>
          <Chart
            getOptions={this.getHospitalChartOption}
            data={this.hospitalChartData}
          />
          <Chart
            getOptions={this.getDrugChartOption}
            data={this.drugChartData}
          />
          <Table
            noHeader
            noArrow
            data={[
              {
                title: "医疗总收入",
                money: total.value,
                rate: total.rate,
                to: "/cockpit/income/total",
                id: 0
              },
              {
                title: "门急诊收入",
                color: "#24B1F3",
                money: unInHospital.value,
                rate: unInHospital.rate,
                to: "/cockpit/income/uninhospital",
                id: 1
              },
              {
                title: "住院收入",
                color: "#f27b7f",
                money: inHospital.value,
                rate: inHospital.rate,
                to: "/cockpit/income/inhospital",
                id: 2
              },
              {
                title: "非药品收入",
                color: "#4a4a4a",
                money: nonDrug.value,
                rate: nonDrug.rate,
                to: "/cockpit/income/nondrug",
                id: 3
              },
              {
                title: "药品收入",
                color: "#23d7bd",
                money: drug.value,
                rate: drug.rate,
                to: "/cockpit/income/drug",
                id: 4
              }
            ].map(ele => ({
              ...ele,
              to: type === "year" ? "" : { pathname: ele.to, search: searchs }
            }))}
            columns={[
              {
                render: ele => (
                  <IncomeLeft color={ele.color}>{ele.title}</IncomeLeft>
                ),
                id: 0
              },
              {
                render: ele => <Rate value={ele.rate} />,
                id: 1
              },
              {
                render: ele => (
                  <IncomeRight>
                    <span>{ele.money && `￥${ele.money}`}</span>
                    {ele.to && <RightArrow />}
                  </IncomeRight>
                ),
                id: 2
              }
            ]}
          />
        </BlockArea>
        <LinePointer>当天凌晨4点更新昨天数据</LinePointer>
      </div>
    );
  }
}

export default Cockpit;
