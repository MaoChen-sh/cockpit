import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Cockpit from "./view/Cockpit";
import Outpatient from "./view/Cockpit/Outpatient";
import Surgery from "./view/Cockpit/Surgery";
import BodyCheck from "./view/Cockpit/BodyCheck";
import Hospital from "./view/Cockpit/Hospital";
import Income from "./view/Cockpit/Income";

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
