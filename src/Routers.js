import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Cockpit from "./view/Cockpit";

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route path="/cockpit/:type" component={Cockpit} />
        <Redirect to="/cockpit/day" />
      </Switch>
    );
  }
}

export default Routers;
