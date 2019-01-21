import React, { PureComponent } from "react";
import styled from "styled-components";
import { LinePointer } from "components";
import { Link } from "react-router-dom";
import { ReactComponent as Doctor } from "static/svg/doctor.svg";
import { ReactComponent as Reserve } from "static/svg/reserve.svg";
import { ReactComponent as Prescription } from "static/svg/prescription.svg";
import { ReactComponent as Bed } from "static/svg/bed.svg";
import { ReactComponent as Sufferer } from "static/svg/sufferer.svg";
import { ReactComponent as Meet } from "static/svg/meet.svg";
import { ReactComponent as Drug } from "static/svg/drug.svg";
const Wrap = styled.div`
  width: calc(92vw + 10px);
  margin: 0 auto;
`;
const Item = styled(Link)`
  float: left;
  background: #ffffff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  height: 100px;
  width: 46vw;
  margin-right: 10px;
  margin-top: 10px;
  padding: 12px;
  &:nth-child(2n) {
    margin-right: 0;
  }
  & > svg {
    width: 30px;
    height: 30px;
    float: right;
  }
`;
const Title = styled.h5`
  clear: both;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  line-height: 1;
  margin-top: 5px;
`;
const Description = styled.p`
  font-size: 12px;
  color: #6b6b6b;
  line-height: 1;
  margin-top: 10px;
`;
const TEXT = {
  tech: "医技",
  bed: "床位使用率",
  reserve: "预约",
  prescription: "处方",
  sufferer: "患者负担",
  meet: "会诊",
  drug: "药品分析"
};
const POINT_TEXT = "当天凌晨4点更新昨天数据";
const DESCRIPTION_TEXT = {
  tech: "统计11项检查",
  bed: "核定床位900张",
  reserve: "统计6种预约途径",
  prescription: "统计门诊处方",
  sufferer: "统计7类患者负担",
  meet: "统计发起会诊和接受会诊",
  drug: "统计各类药品的金额"
};
const Svgs = {
  tech: <Doctor />,
  bed: <Bed />,
  reserve: <Reserve />,
  prescription: <Prescription />,
  sufferer: <Sufferer />,
  meet: <Meet />,
  drug: <Drug />
};
const list = [
  "tech",
  "bed",
  "reserve",
  "prescription",
  "sufferer",
  "meet",
  "drug"
];
class SpeProject extends PureComponent {
  render() {
    return (
      <>
        <Wrap>
          {list.map((ele, index) => (
            <Item key={index} to={"/speproject/" + ele + "/month"}>
              {Svgs[ele]}
              <Title>{TEXT[ele]}</Title>
              <Description>{DESCRIPTION_TEXT[ele]}</Description>
            </Item>
          ))}
        </Wrap>
        <LinePointer
          defaultStyles={`
          position: fixed;
          bottom: 48px;
          left: 0;
          right: 0;
          margin: auto;
        `}
        >
          {POINT_TEXT}
        </LinePointer>
      </>
    );
  }
}

export default SpeProject;
