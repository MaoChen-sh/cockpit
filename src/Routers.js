import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Cockpit from "./view/Cockpit";
import Outpatient from "./view/Cockpit/Outpatient";
import Surgery from "./view/Cockpit/Surgery";
import BodyCheck from "./view/Cockpit/BodyCheck";
import EnterHospital from "./view/Cockpit/EnterHospital";
import LeaveHospital from "./view/Cockpit/LeaveHospital";
import InHospital from "./view/Cockpit/InHospital";
import Income from "./view/Cockpit/Income";

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route path="/cockpit/home/:type" component={Cockpit} />
        <Route path="/cockpit/outpatient" component={Outpatient} />
        <Route path="/cockpit/surgery" component={Surgery} />
        <Route path="/cockpit/bodycheck" component={BodyCheck} />
        <Route path="/cockpit/enterhospital" component={EnterHospital} />
        <Route path="/cockpit/leavehospital" component={LeaveHospital} />
        <Route path="/cockpit/inhospital" component={InHospital} />
        <Route path="/cockpit/income/:type" component={Income} />
        <Redirect to="/cockpit/home/day" />
      </Switch>
    );
  }
}

export default Routers;
