import React, { PureComponent } from "react";
import { PersonCard, TableTemp as Table } from "view/components";
import { BlockArea, RightArrow } from "components";
import styled from "styled-components";
import { getMoney } from "tools";
const UserWrap = styled(BlockArea)`
  padding: 0;
`;
const TableWrap = styled(BlockArea)`
  padding: 0 20px;
`;
const DownArrow = styled(RightArrow)`
  transform: rotate(${p => (p.active ? "-90deg" : "90deg")});
  transition: 0.3s;
`;
class Mine extends PureComponent {
  state = {
    showOutPatientSpending: false,
    showBSuper: false
  };
  columns = [
    {
      title: "icon",
      render: ele => ele.icon,
      id: 0
    },
    {
      title: "name",
      render: ele => ele.name,
      id: 1
    },
    {
      title: "value",
      render: ele => ele.value,
      id: 2
    },
    {
      title: "toggle",
      render: ele => ele.toggle,
      id: 3
    }
  ];
  toggleOutPatientSpending = () => {
    this.setState({
      showOutPatientSpending: !this.state.showOutPatientSpending
    });
  };
  toggleBSuperServer = () => {
    this.setState({
      showBSuper: !this.state.showBSuper
    });
  };
  get dataList() {
    const { showOutPatientSpending, showBSuper } = this.state;
    return [
      {
        icon: "",
        name: "门诊服务患者数",
        value: 1098,
        id: "outPatientCount"
      },
      {
        icon: "",
        name: "门诊患者费用",
        value: getMoney(34),
        toggle: (
          <DownArrow
            onClick={this.toggleOutPatientSpending}
            active={showOutPatientSpending}
          />
        ),
        id: "outPatientSpending"
      },
      ...(showOutPatientSpending
        ? [
            {
              name: "挂号费",
              value: getMoney(34),
              id: "outPatientSpending1",
              className: "child"
            },
            {
              name: "挂号费",
              value: getMoney(34),
              id: "outPatientSpending2",
              className: "child"
            },
            {
              name: "挂号费",
              value: getMoney(34),
              id: "outPatientSpending3",
              className: "child"
            }
          ]
        : []),
      {
        icon: "",
        name: "住院服务患者数",
        value: 1098,
        id: "inHospitalCount"
      },
      {
        icon: "",
        name: "住院患者费用",
        value: getMoney(34),
        id: "inHospitalSpending"
      },
      {
        icon: "",
        name: "医技B超服务数量",
        value: 1098,
        toggle: (
          <DownArrow onClick={this.toggleBSuperServer} active={showBSuper} />
        ),
        id: "BSuperServer"
      },
      ...(showBSuper
        ? [
            {
              name: "医技B超服务数量",
              value: 56,
              id: "BSuperServer1",
              className: "child"
            },
            {
              name: "医技B超服务数量",
              value: getMoney(34),
              id: "BSuperServer2",
              className: "child"
            },
            {
              name: "医技B超服务数量",
              value: 56,
              id: "BSuperServer3",
              className: "child"
            }
          ]
        : [])
    ];
  }
  render() {
    console.log(this.setState.showOutPatientSpending);
    return (
      <>
        <UserWrap>
          <PersonCard />
        </UserWrap>
        <BlockArea>2018.07.02</BlockArea>
        <TableWrap>
          <Table
            noHeader
            columns={this.columns}
            data={this.dataList}
            defaultStyles={`
            .child{
              background: #F0F0F0;
              border-bottom: 1px solid #fff;
              td{
                font-size: 12px;
                color: #666666;
              }
            }
          `}
          />
        </TableWrap>
      </>
    );
  }
}

Mine.propTypes = {};

export default Mine;
