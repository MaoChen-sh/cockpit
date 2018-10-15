import React, { PureComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Cockpit from "./view/Cockpit";

class Routers extends PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/cockpit" component={Cockpit} />
        <Redirect to="/cockpit" />
      </Switch>
    );
  }
}

export default Routers;
