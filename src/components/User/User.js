import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ReactComponent as Female } from "wowjoy-ui/es/static/medias/svg/patient_female.svg";
import { ReactComponent as Male } from "wowjoy-ui/es/static/medias/svg/patient_male.svg";
const Wrap = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;
const Info = styled.div`
  & > p {
    font-size: 14px;
    color: #4a4a4a;
  }
  & > span {
    font-size: 10px;
    color: #999999;
    white-space: nowrap;
  }
`;
class User extends PureComponent {
  render() {
    const { isMale, name, depart } = this.props;
    return (
      <Wrap>
        {isMale ? <Male /> : <Female />}
        <Info>
          <p>{name}</p>
          <span>{depart}</span>
        </Info>
      </Wrap>
    );
  }
}

User.propTypes = {
  isMale: PropTypes.bool,
  name: PropTypes.node,
  depart: PropTypes.node
};

export default User;
