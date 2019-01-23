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
import BodyCheck from "./view/Cockpit/BodyCheck";
import BodyCheckRateDetail from "./view/Cockpit/BodyCheck/RateDetail";
import BodyCheckCountDetail from "./view/Cockpit/BodyCheck/CountDetail";
import Hospital from "./view/Cockpit/Hospital";
import HospitalDetail from "./view/Cockpit/Hospital/Detail";
import Income from "./view/Cockpit/Income";
import IncomeDetail from "./view/Cockpit/Income/Detail";
import SuffererMap from "./view/Cockpit/SuffererMap";

import SpeProject from "./view/SpeProject";
import SpeTech from "./view/SpeProject/Tech";
import SpeTechProject from "./view/SpeProject/Tech/Project";
import SpeReserve from "./view/SpeProject/Reserve";
import SpeReserveList from "./view/SpeProject/Reserve/List";
import SpePrescription from "./view/SpeProject/Prescription";
import SpeBed from "./view/SpeProject/Bed";
import SpeBedDetail from "./view/SpeProject/Bed/Detail";
import SpeSufferer from "./view/SpeProject/Sufferer";
import SpeSuffererList from "./view/SpeProject/Sufferer/List";
import SpeDrug from "./view/SpeProject/Drug";
import SpeDrugDetail from "./view/SpeProject/Drug/Detail";

import Nursing from "./view/Nursing";
import Norms from "./view/Nursing/Norms";

import Statistics from "./view/Statistics";
import ItemSelect from "./view/Statistics/ItemSelect";
import ProjectSelect from "./view/Statistics/ProjectSelect";
import DataDisplay from "./view/Statistics/DataDisplay";

import Mine from "./view/Mine";
class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route path="/cockpit/home/:type" component={Cockpit} />
        <Route exact path="/cockpit/outpatient" component={Outpatient} />
        <Route path="/cockpit/outpatient/detail" component={OutpatientDetail} />
        <Route
          path="/cockpit/outpatient/timedetail"
          component={OutpatientTimeDetail}
        />
        <Route exact path="/cockpit/surgery" component={Surgery} />
        <Route path="/cockpit/surgery/detail" component={SurgeryDetail} />
        <Route
          path="/cockpit/surgery/typedetail"
          component={SurgeryTypeDetail}
        />
        <Route
          path="/cockpit/surgery/leveldetail"
          component={SurgeryLevelDetail}
        />
        <Route exact path="/cockpit/bodycheck" component={BodyCheck} />
        <Route
          exact
          path="/cockpit/bodycheck/countdetail"
          component={BodyCheckCountDetail}
        />
        <Route
          exact
          path="/cockpit/bodycheck/ratedetail"
          component={BodyCheckRateDetail}
        />
        <Route exact path="/cockpit/hospital/:type" component={Hospital} />
        <Route exact path="/cockpit/hospital/:type/detail" component={HospitalDetail} />
        <Route exact path="/cockpit/income/:type" component={Income} />
        <Route exact path="/cockpit/income/:type/detail" component={IncomeDetail} />

        <Route path="/cockpit/map" component={SuffererMap} />

        <Route exact path="/speproject" component={SpeProject} />
        <Route exact path="/speproject/tech/:type?" component={SpeTech} />
        <Route
          exact
          path="/speproject/techproject"
          component={SpeTechProject}
        />
        <Route exact path="/speproject/reserve/:type" component={SpeReserve} />
        <Route
          exact
          path="/speproject/reservelist"
          component={SpeReserveList}
        />
        <Route
          exact
          path="/speproject/prescription/:type"
          component={SpePrescription}
        />
        <Route exact path="/speproject/bed/:type" component={SpeBed} />
        <Route exact path="/speproject/beddetail" component={SpeBedDetail} />
        <Route
          exact
          path="/speproject/sufferer/:type"
          component={SpeSufferer}
        />
        <Route
          exact
          path="/speproject/suffererlist"
          component={SpeSuffererList}
        />
        <Route exact path="/speproject/drug/:type" component={SpeDrug} />
        <Route exact path="/speproject/drugdetail" component={SpeDrugDetail} />

        <Route exact path="/nursing" component={Nursing} />
        <Route path="/nursing/:norm/:childNorm?" component={Norms} />

        <Route exact path="/statistics" component={Statistics} />
        <Route path="/statistics/itemselect/:type" component={ItemSelect} />
        <Route path="/statistics/projectselect" component={ProjectSelect} />
        <Route path="/statistics/datadisplay" component={DataDisplay} />

        <Route path="/mine" component={Mine} />

        <Redirect to="/cockpit/home/day" />
      </Switch>
    );
  }
}

export default Routers;
