import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Cockpit from "./view/Cockpit";
import Outpatient from "./view/Cockpit/Outpatient";
import Surgery from "./view/Cockpit/Surgery";
import BodyCheck from "./view/Cockpit/BodyCheck";

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route path="/cockpit/home/:type" component={Cockpit} />
        <Route path="/cockpit/outpatient" component={Outpatient} />
        <Route path="/cockpit/surgery" component={Surgery} />
        <Route path="/cockpit/bodycheck" component={BodyCheck} />
        <Redirect to="/cockpit/home/day" />
      </Switch>
    );
  }
}

export default Routers;
