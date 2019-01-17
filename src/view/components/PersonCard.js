import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Card = styled.section`
  width: 100%;
  height: 1;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 14px 20px;
  img {
    border-radius: 4px;
    width: 64px;
    height: 64px;
  }
`;
const Text = styled.div`
  h4 {
    font-size: 16px;
    color: #333333;
  }
  p {
    margin-top: 5px;
    font-size: 12px;
    color: #666666;
  }
`;
const Job = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px dotted #d3d3d3;
  height: 40px;
  align-items: center;
  font-size: 14px;
  color: #666;
  padding: 0 20px;
  div:last-child {
    font-size: 12px;
  }
`;

const fakeData = {
  name: "张大三",
  phone: "134-4567-5555",
  depart: "产科",
  position: "科室主任"
};
class PersonCard extends PureComponent {
  render() {
    const { depart, position, name, phone } = fakeData;
    return (
      <Card>
        <Info>
          <Text>
            <h4>{name}</h4>
            <p>{phone}</p>
          </Text>
          <img src="" alt="" />
        </Info>
        <Job>
          <div>{depart}</div>
          <div>{position}</div>
        </Job>
      </Card>
    );
  }
}

PersonCard.propTypes = {};

export default PersonCard;
