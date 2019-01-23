import React from "react";
import { DateSelectPageTemplate } from "view/Template";
import { LinkList } from "view/components";
import { getMoney } from "tools";
import { ReactComponent as DrugMoneyIcon } from "static/svg/average_prescription_amount.svg";
class Drug extends DateSelectPageTemplate {
  noPointer = true;
  get DrugList() {
    return [
      {
        content: "抗生素类药品总金额",
        svg: DrugMoneyIcon,
        value: getMoney(Math.round(Math.random() * 500)),
        to: {
          pathname: "/speproject/drugdetail",
          state: {
            drug: "antibiotic",
            drugName: "抗生素类药品总金额",
            type: this.type
          }
        }
      },
      {
        content: "心脑血管用药总金额",
        svg: DrugMoneyIcon,
        value: getMoney(Math.round(Math.random() * 500)),
        to: {
          pathname: "/speproject/drugdetail",
          state: {
            drug: "cardiovascular",
            drugName: "心脑血管用药总金额",
            type: this.type
          }
        }
      },
      {
        content: "消化系统用药总金额",
        svg: DrugMoneyIcon,
        value: getMoney(Math.round(Math.random() * 500)),
        to: {
          pathname: "/speproject/drugdetail",
          state: {
            drug: "digestiveSystem",
            drugName: "消化系统用药总金额",
            type: this.type
          }
        }
      },
      {
        content: "呼吸系统用药总金额",
        svg: DrugMoneyIcon,
        value: getMoney(Math.round(Math.random() * 20000)),
        to: {
          pathname: "/speproject/drugdetail",
          state: {
            drug: "respiratorySystem",
            drugName: "呼吸系统用药总金额",
            type: this.type
          }
        }
      },
      {
        content: "泌尿系统用药总金额",
        svg: DrugMoneyIcon,
        value: getMoney(Math.round(Math.random() * 10000)),
        to: {
          pathname: "/speproject/drugdetail",
          state: {
            drug: "urinarySystem",
            drugName: "泌尿系统用药总金额",
            type: this.type
          }
        }
      },
      {
        content: "血液系统用药总金额",
        svg: DrugMoneyIcon,
        value: getMoney(Math.round(Math.random() * 500)),
        to: {
          pathname: "/speproject/drugdetail",
          state: {
            drug: "bloodSystem",
            drugName: "血液系统用药总金额",
            type: this.type
          }
        }
      },
      {
        content: "皮肤科用药总金额",
        svg: DrugMoneyIcon,
        value: getMoney(Math.round(Math.random() * 50000)),
        to: {
          pathname: "/speproject/drugdetail",
          state: {
            drug: "dermatology",
            drugName: "皮肤科用药总金额",
            type: this.type
          }
        }
      },
      {
        content: "抗肿瘤用药总金额",
        svg: DrugMoneyIcon,
        value: getMoney(Math.round(Math.random() * 50000)),
        to: {
          pathname: "/speproject/drugdetail",
          state: {
            drug: "antitumor",
            drugName: "抗肿瘤用药总金额",
            type: this.type
          }
        }
      }
    ];
  }
  get content() {
    console.log(this.type);
    if (this.type !== "day") {
      return (
        <LinkList
          list={this.DrugList.map(ele => ({
            ...ele,
            rate: Math.random() - 0.5
          }))}
        />
      );
    }
    return <LinkList list={this.DrugList} />;
  }
  TabList = [
    { content: "日报", id: "day", to: "/speproject/drug/day" },
    { content: "月报", id: "month", to: "/speproject/drug/month" },
    { content: "年报", id: "year", to: "/speproject/drug/year" }
  ];
}

export default Drug;
