import React from "react";
import { BlockArea, List as ListBase } from "components";
import styled from "styled-components";
import { ReactComponent as Ultrasound } from "static/svg/ultrasound.svg";
import { ReactComponent as CTbase } from "static/svg/ct.svg";
import { ReactComponent as DRbase } from "static/svg/dr.svg";
import { ReactComponent as Hemodialysis } from "static/svg/hemodialysis.svg";
import { ReactComponent as MRbase } from "static/svg/mr.svg";
import { ReactComponent as Endoscopy } from "static/svg/endoscopy.svg";
import { ReactComponent as Peritoneal } from "static/svg/peritoneal.svg";
import { ReactComponent as DigitalGastrointestinal } from "static/svg/digital_gastrointestinal.svg";
import { ReactComponent as Breast } from "static/svg/breast.svg";
import { ReactComponent as Electrocardiogram } from "static/svg/electrocardiogram.svg";
import { ReactComponent as Interventional } from "static/svg/interventional.svg";
import { DateSelectPageTemplate } from "view/Template";
const CT = styled(CTbase)`
  path {
    fill: #3fb1fa;
  }
`;
const DR = styled(DRbase)`
  path {
    fill: #3fb1fa;
  }
`;
const MR = styled(MRbase)`
  path {
    fill: #3fb1fa;
  }
`;
const NavList = styled(ListBase)`
  & > li {
    display: flex;
    justify-content: space-around;
  }
`;
class Tech extends DateSelectPageTemplate {
  get techList() {
    const List = [
      {
        svg: Ultrasound,
        title: "超声",
        count: 352,
        rate: null,
        to: "/speproject/techproject/ultrasound"
      },
      {
        svg: CT,
        title: "CT检查",
        count: 352,
        rate: null,
        to: "/speproject/techproject/ct"
      },
      {
        svg: DR,
        title: "DR检查",
        count: 352,
        rate: null,
        to: "/speproject/techproject/dr"
      },
      {
        svg: Hemodialysis,
        title: "血透",
        count: 352,
        rate: null,
        to: "/speproject/techproject/hemodialysis"
      },
      {
        svg: MR,
        title: "MR检查",
        count: 352,
        rate: null,
        to: "/speproject/techproject/mr"
      },
      {
        svg: Endoscopy,
        title: "内镜检查",
        count: 352,
        rate: null,
        to: "/speproject/techproject/endoscopy"
      },
      {
        svg: Peritoneal,
        title: "腹透",
        count: 352,
        rate: null,
        to: "/speproject/techproject/peritoneal"
      },
      {
        svg: DigitalGastrointestinal,
        title: "数字肠胃检查",
        count: 352,
        rate: null,
        to: "/speproject/techproject/digitalgastrointestinal"
      },
      {
        svg: Breast,
        title: "乳腺检查",
        count: 352,
        rate: null,
        to: "/speproject/techproject/breast"
      },
      {
        svg: Electrocardiogram,
        title: "心电图",
        count: 352,
        rate: null,
        to: "/speproject/techproject/electrocardiogram"
      },
      {
        svg: Interventional,
        title: "介入治疗检查",
        count: 352,
        rate: null,
        to: "/speproject/techproject/interventional"
      }
    ];
    return List;
  }
  get content() {
    return (
      <BlockArea title={"医技总数"} count={849}>
        <NavList list={this.reduceNavItem(this.techList)} />
      </BlockArea>
    );
  }

  TabList = [
    { content: "日报", id: "day", to: "/speproject/tech/day" },
    { content: "月报", id: "month", to: "/speproject/tech/month" },
    { content: "年报", id: "year", to: "/speproject/tech/year" }
  ];
}

Tech.propTypes = {};

export default Tech;
