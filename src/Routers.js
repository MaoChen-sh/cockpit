import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Cockpit from "./view/Cockpit";
import Outpatient from "./view/Cockpit/Outpatient";
import Surgery from "./view/Cockpit/Surgery";
import BodyCheck from "./view/Cockpit/BodyCheck";
import Hospital from "./view/Cockpit/Hospital";
import Income from "./view/Cockpit/Income";

import SpeProject from "./view/SpeProject";
import SpeTech from "./view/SpeProject/Tech";
import SpeTechProject from "./view/SpeProject/Tech/Project";
import SpeReserve from "./view/SpeProject/Reserve";
import SpeReserveList from "./view/SpeProject/Reserve/List";
import SpePrescription from "./view/SpeProject/Prescription";
import SpeBed from "./view/SpeProject/Bed";
import SpeBedDetail from "./view/SpeProject/Bed/Detail";
import SpeSufferer from "./view/SpeProject/Sufferer";

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
        <Route path="/cockpit/outpatient" component={Outpatient} />
        <Route path="/cockpit/surgery" component={Surgery} />
        <Route path="/cockpit/bodycheck" component={BodyCheck} />
        <Route path="/cockpit/hospital/:type" component={Hospital} />
        <Route path="/cockpit/income/:type" component={Income} />

        <Route exact path="/speproject" component={SpeProject} />
        <Route exact path="/speproject/tech/:type?" component={SpeTech} />
        <Route
          exact
          path="/speproject/techproject/:project"
          component={SpeTechProject}
        />
        <Route exact path="/speproject/reserve/:type" component={SpeReserve} />
        <Route
          exact
          path="/speproject/reservelist/:dataType/:viewType"
          component={SpeReserveList}
        />
        <Route
          exact
          path="/speproject/prescription/:type?"
          component={SpePrescription}
        />
        <Route exact path="/speproject/bed/:type?" component={SpeBed} />
        <Route exact path="/speproject/beddetail" component={SpeBedDetail} />
        <Route
          exact
          path="/speproject/sufferer/:type?"
          component={SpeSufferer}
        />

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
