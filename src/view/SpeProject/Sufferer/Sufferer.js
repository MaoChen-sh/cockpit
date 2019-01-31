import React from "react";
import { DateSelectPageTemplate } from "view/Template";
import { LinkList } from "view/components";
import { getMoney } from "tools";
import { ReactComponent as OutpatientAverageSpending } from "static/svg/outpatient_average_spending.svg";
import { ReactComponent as OutpatientAverageDrugSpending } from "static/svg/outpatient_average_drug_spending.svg";
import { ReactComponent as AveragePrescriptionAmount } from "static/svg/average_prescription_amount.svg";
import { ReactComponent as HospitalizationAverageSpending } from "static/svg/hospitalization_average_spending.svg";
import { ReactComponent as OutHospitalAverageDrugSpending } from "static/svg/out_hospital_average_drug_spending.svg";
import { ReactComponent as MedicalExaminationAverageSpending } from "static/svg/medical_examination_average_spending.svg";

class sufferer extends DateSelectPageTemplate {
  noPointer = true;
  get ItemList() {
    return [
      {
        content: "门急诊均次费用",
        svg: OutpatientAverageSpending,
        value: getMoney(Math.round(Math.random() * 500)),
        to: {
          pathname: "/speproject/suffererdetail",
          state: { item: "outpatientaveragespending", type: this.type }
        }
      },
      {
        content: "门急诊人均药品费用",
        svg: OutpatientAverageDrugSpending,
        value: getMoney(Math.round(Math.random() * 500)),
        to: {
          pathname: "/speproject/suffererdetail",
          state: { item: "outpatientaveragedrugspending", type: this.type }
        }
      },
      {
        content: "平均处方金额",
        svg: AveragePrescriptionAmount,
        value: getMoney(Math.round(Math.random() * 500)),
        to: {
          pathname: "/speproject/suffererdetail",
          state: { item: "averageprescriptionamount", type: this.type }
        }
      },
      {
        content: "住院均次费用",
        svg: HospitalizationAverageSpending,
        value: getMoney(Math.round(Math.random() * 20000)),
        to: {
          pathname: "/speproject/suffererdetail",
          state: { item: "hospitalizationaveragespending", type: this.type }
        }
      },
      {
        content: "出院病人人均药品费用",
        svg: OutHospitalAverageDrugSpending,
        value: getMoney(Math.round(Math.random() * 10000)),
        to: {
          pathname: "/speproject/suffererdetail",
          state: { item: "outhospitalaveragedrugspending", type: this.type }
        }
      },
      {
        content: "每体检人次费用",
        svg: MedicalExaminationAverageSpending,
        value: getMoney(Math.round(Math.random() * 500)),
        to: {
          pathname: "/speproject/suffererbodycheckdetail",
          state: { type: this.type }
        }
      }
    ];
  }
  get content() {
    if (this.type !== "day") {
      return (
        <LinkList
          list={this.ItemList.map(ele => ({
            ...ele,
            rate: Math.random() - 0.5
          }))}
        />
      );
    }
    return <LinkList list={this.ItemList} />;
  }
  TabList = [
    { content: "日报", id: "day", to: "/speproject/sufferer/day" },
    { content: "月报", id: "month", to: "/speproject/sufferer/month" },
    { content: "年报", id: "year", to: "/speproject/sufferer/year" }
  ];
}

export default sufferer;
