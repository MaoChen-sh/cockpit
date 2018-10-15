import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ArcDate from "components/ArcDate";

const propTypes = {};

class Cockpit extends PureComponent {
  render() {
    return (
      <div>
        <ArcDate />
      </div>
    );
  }
}

Cockpit.propTypes = propTypes;

export default Cockpit;
