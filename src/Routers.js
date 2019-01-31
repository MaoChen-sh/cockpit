import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Cockpit from "./view/Cockpit";
import Outpatient from "./view/Cockpit/Outpatient";
import OutpatientDetail from "./view/Cockpit/Outpatient/Detail";
import OutpatientTimeDetail from "./view/Cockpit/Outpatient/TimeDetail";
import Surgery from "./view/Cockpit/Surgery";
import SurgeryDetail from "./view/Cockpit/Surgery/Detail";
import SurgeryTypeDetail from "./view/Cockpit/Surgery/TypeDetail";
import SurgeryLevelDetail from "./view/Cockpit/Surgery/LevelDetail";
import SurgeryTimeDetail from "./view/Cockpit/Surgery/TimeDetail";
import BodyCheck from "./view/Cockpit/BodyCheck";
import BodyCheckRateDetail from "./view/Cockpit/BodyCheck/RateDetail";
import BodyCheckCountDetail from "./view/Cockpit/BodyCheck/CountDetail";
import Hospital from "./view/Cockpit/Hospital";
import HospitalDetail from "./view/Cockpit/Hospital/Detail";
import HospitalDiseaseDetail from "./view/Cockpit/Hospital/DiseaseDetail";
import Income from "./view/Cockpit/Income";
import IncomeDetail from "./view/Cockpit/Income/Detail";
import IncomeTypeDetail from "./view/Cockpit/Income/TypeDetail";
import IncomeTotalSingle from "./view/Cockpit/Income/TotalSingle";
import IncomeDrugSingle from "./view/Cockpit/Income/DrugSingle";
import SuffererMap from "./view/Cockpit/SuffererMap";

import SpeProject from "./view/SpeProject";
import SpeTech from "./view/SpeProject/Tech";
import SpeTechProject from "./view/SpeProject/Tech/Project";
import SpeReserve from "./view/SpeProject/Reserve";
import SpeReserveList from "./view/SpeProject/Reserve/List";
import SpeReserveDetail from "./view/SpeProject/Reserve/Detail";
import SpePrescription from "./view/SpeProject/Prescription";
import SpePrescriptionDetail from "./view/SpeProject/Prescription/Detail";
import SpeBed from "./view/SpeProject/Bed";
import SpeBedDetail from "./view/SpeProject/Bed/Detail";
import SpeSufferer from "./view/SpeProject/Sufferer";
import SpeSuffererDetail from "./view/SpeProject/Sufferer/Detail";
import SpeSuffererBodyCheckDetail from "./view/SpeProject/Sufferer/BodyCheckDetail";
import SpeDrug from "./view/SpeProject/Drug";
import SpeDrugDetail from "./view/SpeProject/Drug/Detail";

import Nursing from "./view/Nursing";
import Norms from "./view/Nursing/Norms";
import NormsDetail from "./view/Nursing/Norms/Detail";

import Statistics from "./view/Statistics";
import ItemSelect from "./view/Statistics/ItemSelect";
import ProjectSelect from "./view/Statistics/ProjectSelect";
import DataDisplay from "./view/Statistics/DataDisplay";

import Mine from "./view/Mine";
class Routers extends Component {
  routerList = [
    {
      props: { path: "/cockpit/home/:type" },
      component: Cockpit,
      title: "驾驶舱"
    },
    {
      props: { exact: true, path: "/cockpit/outpatient" },
      component: Outpatient,
      title: "门急诊人次"
    },
    {
      props: { path: "/cockpit/outpatient/detail" },
      component: OutpatientDetail,
      title: "门急诊人次"
    },
    {
      props: { path: "/cockpit/outpatient/timedetail" },
      component: OutpatientTimeDetail,
      title: "门急诊人次"
    },
    {
      props: { exact: true, path: "/cockpit/surgery" },
      component: Surgery,
      title: "手术台数"
    },
    {
      props: { path: "/cockpit/surgery/detail" },
      component: SurgeryDetail,
      title: "手术台数"
    },
    {
      props: { path: "/cockpit/surgery/typedetail" },
      component: SurgeryTypeDetail,
      title: "手术台数"
    },
    {
      props: { path: "/cockpit/surgery/leveldetail" },
      component: SurgeryLevelDetail,
      title: "手术台数"
    },
    {
      props: { path: "/cockpit/surgery/timedetail" },
      component: SurgeryTimeDetail,
      title: "手术台数"
    },
    {
      props: { exact: true, path: "/cockpit/bodycheck" },
      component: BodyCheck,
      title: "体检人数"
    },
    {
      props: { path: "/cockpit/bodycheck/countdetail" },
      component: BodyCheckCountDetail,
      title: "体检人数"
    },
    {
      props: { path: "/cockpit/bodycheck/ratedetail" },
      component: BodyCheckRateDetail,
      title: "体检人数"
    },
    {
      props: { exact: true, path: "/cockpit/hospital/:type" },
      component: Hospital,
      getTitle: ({ type }) =>
        ({ in: "在院人数", leave: "出院人数", enter: "入院人数" }[type])
    },
    {
      props: { path: "/cockpit/hospital/:type/detail" },
      component: HospitalDetail
    },
    {
      props: { path: "/cockpit/hospital/:type/diseasedetail" },
      component: HospitalDiseaseDetail
    },
    {
      props: { exact: true, path: "/cockpit/income/:type" },
      component: Income,
      getTitle: ({ type }) =>
        ({
          total: "医疗总收入",
          uninhospital: "门急诊收入",
          inhospital: "住院收入",
          nondrug: "非药品收入",
          drug: "药品收入"
        }[type])
    },
    {
      props: { path: "/cockpit/income/:type/detail" },
      component: IncomeDetail
    },
    {
      props: { path: "/cockpit/income/:type/typedetail" },
      component: IncomeTypeDetail,
      getTitle: ({ type }) =>
        ({
          total: "医疗总收入",
          uninhospital: "门急诊收入",
          inhospital: "住院收入",
          nondrug: "非药品收入",
          drug: "药品收入"
        }[type])
    },
    {
      props: { path: "/cockpit/income/total/single" },
      component: IncomeTotalSingle,
      title: "医疗总收入单项"
    },
    {
      props: { path: "/cockpit/income/drug/single" },
      component: IncomeDrugSingle,
      title: "不同类别药品收入"
    },
    {
      props: { path: "/cockpit/map" },
      component: SuffererMap,
      title: "患者地图"
    },
    /* 专题 */
    {
      props: { exact: true, path: "/speproject" },
      component: SpeProject,
      title: "专题"
    },
    {
      props: { exact: true, path: "/speproject/tech/:type?" },
      component: SpeTech,
      title: "医技"
    },
    { props: { path: "/speproject/techproject" }, component: SpeTechProject },
    {
      props: { exact: true, path: "/speproject/reserve/:type" },
      component: SpeReserve,
      title: "预约"
    },
    { props: { path: "/speproject/reservelist" }, component: SpeReserveList },
    {
      props: { path: "/speproject/reservedetail" },
      component: SpeReserveDetail
    },
    {
      props: { path: "/speproject/prescription/:type" },
      component: SpePrescription,
      title: "处方"
    },
    {
      props: { path: "/speproject/prescriptiondetail" },
      component: SpePrescriptionDetail
    },
    {
      props: { exact: true, path: "/speproject/bed/:type" },
      component: SpeBed,
      title: "床位使用率"
    },
    {
      props: { exact: true, path: "/speproject/beddetail" },
      component: SpeBedDetail
    },
    {
      props: { path: "/speproject/sufferer/:type" },
      component: SpeSufferer,
      title: "患者负担"
    },
    {
      props: { path: "/speproject/suffererdetail" },
      component: SpeSuffererDetail
    },
    {
      props: { path: "/speproject/suffererbodycheckdetail" },
      component: SpeSuffererBodyCheckDetail
    },
    {
      props: { exact: true, path: "/speproject/drug/:type" },
      component: SpeDrug,
      title: "药品分析"
    },
    {
      props: { exact: true, path: "/speproject/drugdetail" },
      component: SpeDrugDetail,
      title: "药品详情"
    },

    {
      props: { exact: true, path: "/nursing" },
      component: Nursing,
      title: "护理"
    },
    {
      props: { exact: true, path: "/nursing/normsdetail" },
      component: NormsDetail
    },
    { props: { path: "/nursing/:norm/:childNorm?" }, component: Norms },

    { props: { exact: true, path: "/statistics" }, component: Statistics },
    { props: { path: "/statistics/itemselect/:type" }, component: ItemSelect },
    { props: { path: "/statistics/projectselect" }, component: ProjectSelect },
    { props: { path: "/statistics/datadisplay" }, component: DataDisplay },

    { props: { path: "/mine" }, component: Mine }
  ];
  render() {
    return (
      <Switch>
        {this.routerList.map((ele, index) => (
          <Route
            key={index}
            {...ele.props}
            render={props => {
              const { component: Component, title, getTitle } = ele;
              title && (document.title = title);
              getTitle && (document.title = getTitle(props.match.params));
              return <Component {...props} />;
            }}
          />
        ))}

        <Redirect to="/cockpit/home/day" />
      </Switch>
    );
  }
}

export default Routers;
