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
const ItemList = [
  {
    content: "门急诊均次费用",
    svg: OutpatientAverageSpending,
    value: getMoney(Math.round(Math.random() * 500))
  },
  {
    content: "门急诊人均药品费用",
    svg: OutpatientAverageDrugSpending,
    value: getMoney(Math.round(Math.random() * 500))
  },
  {
    content: "平均处方金额",
    svg: AveragePrescriptionAmount,
    value: getMoney(Math.round(Math.random() * 500))
  },
  {
    content: "住院均次费用",
    svg: HospitalizationAverageSpending,
    value: getMoney(Math.round(Math.random() * 20000))
  },
  {
    content: "出院病人人均药品费用",
    svg: OutHospitalAverageDrugSpending,
    value: getMoney(Math.round(Math.random() * 10000))
  },
  {
    content: "每体检人次费用",
    svg: MedicalExaminationAverageSpending,
    value: getMoney(Math.round(Math.random() * 500))
  }
];

class sufferer extends DateSelectPageTemplate {
  noPointer = true;
  get content() {
    return <LinkList list={ItemList} />;
  }
}

export default sufferer;
