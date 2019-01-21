import React, { PureComponent } from "react";
import { TableTemp as TableBase } from "view/components";
import { Radio, BlockArea, LinePointer } from "components";
import styled from "styled-components";
import { selectedItem } from "context";
const Table = styled(TableBase)`
  td:first-child {
    padding-left: 10px !important;
  }
  td:last-child {
    text-align: right;
    padding-right: 10px;
  }
`;

const fakeData = {
  checkBox: {
    group1: [
      {
        name: "入院人数",
        id: 0
      },
      {
        name: "在院人数",
        id: 1
      },
      {
        name: "出院人数",
        id: 2
      }
    ],
    group2: [
      {
        name: "医疗总收入",
        id: 10
      },
      {
        name: "门急诊收入",
        id: 11
      },
      {
        name: "住院收入",
        id: 12
      },
      {
        name: "药品收入",
        id: 13
      },
      {
        name: "非药品收入",
        id: 14
      }
    ]
  },
  radio: {
    group1: [
      {
        name: "门急诊人次",
        id: 20
      },
      {
        name: "手术台数",
        id: 21
      },
      {
        name: "体检人次",
        id: 22
      },
      {
        name: "入院人数",
        id: 23
      },
      {
        name: "在院人数",
        id: 24
      },
      {
        name: "出院人数",
        id: 25
      },
      {
        name: "医疗总收入",
        id: 26
      },
      {
        name: "门急诊收入",
        id: 27
      },
      {
        name: "住院收入",
        id: 28
      },
      {
        name: "药品收入",
        id: 29
      },
      {
        name: "非药品收入",
        id: 30
      }
    ],
    group2: [
      {
        name: "医技",
        id: 40
      },
      {
        name: "预约",
        id: 41
      },
      {
        name: "处方",
        id: 42
      },
      {
        name: "床位使用率",
        id: 43
      },
      {
        name: "患者负担",
        id: 44
      },
      {
        name: "会诊",
        id: 45
      }
    ]
  }
};
class ProjectSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedProject: [],
      ...fakeData[this.maxSelectAble - 1 === 0 ? "radio" : "checkBox"]
    };
  }

  static contextType = selectedItem;
  maxSelectAble = this.props.location.search.match(/max=(\d+)/)[1];
  tableColumns = [
    {
      render: ele => ele.name,
      id: 0
    },
    {
      render: ele => (
        <Radio
          value={ele.value}
          type={this.maxSelectAble - 1 === 0 ? "radio" : "checkBox"}
          disabled={ele.disabled}
        />
      ),
      id: 1
    }
  ];

  componentDidMount() {
    const selected = this.context.projectData;
    this.setState({
      selectedProject: selected
    });
  }

  clickRow = (rowItem, rowIndex) => {
    let nextSelectedProject;
    if (this.maxSelectAble - 1 === 0) {
      nextSelectedProject = [rowItem];
    } else {
      const { selectedProject } = this.state;
      nextSelectedProject = [...selectedProject];
      if (rowItem.value === true) {
        nextSelectedProject = selectedProject.filter(
          ele => ele.id !== rowItem.id
        );
      } else {
        nextSelectedProject.push(rowItem);
      }
    }

    this.setState({
      selectedProject: nextSelectedProject
    });
    this.context.editor(nextSelectedProject,'project');
  };

  getTableList = name => {
    const { selectedProject } = this.state;
    const stateData = this.state[name];
    if (this.maxSelectAble - 1 === 0) {
      return stateData.map(ele => {
        const isSelecter = selectedProject.some(
          selectedItem => selectedItem.id === ele.id
        );
        return { ...ele, value: isSelecter };
      });
    }
    if (selectedProject.length - this.maxSelectAble === 0) {
      return stateData.map(ele => {
        const isSelecter = selectedProject.some(
          selectedItem => selectedItem.id === ele.id
        );
        return { ...ele, value: isSelecter, disabled: !isSelecter };
      });
    }
    if (
      selectedProject.length === 0 ||
      stateData.some(ele => ele.id === selectedProject[0].id)
    ) {
      return stateData.map(ele => {
        const isSelecter = selectedProject.some(
          selectedItem => selectedItem.id === ele.id
        );
        return { ...ele, value: isSelecter };
      });
    }
    return stateData.map(ele => ({ ...ele, disabled: true }));
  };

  render() {
    const { getTableList } = this;
    console.log(this);
    return (
      <div>
        <LinePointer>{this.maxSelectAble - 1 === 0 ? "最多选择一个统计项" : "最多在同一模块下选择三个项目"}</LinePointer>
        <BlockArea
          title={this.maxSelectAble - 1 === 0 ? "驾驶舱" : "出入院情况"}
        >
          <Table
            noHeader
            noArrow
            columns={this.tableColumns}
            data={getTableList("group1").map(ele => ({
              ...ele,
              onClick: this.clickRow
            }))}
          />
        </BlockArea>
        <BlockArea title={this.maxSelectAble - 1 === 0 ? "专项" : "收入情况"}>
          <Table
            noHeader
            noArrow
            columns={this.tableColumns}
            data={getTableList("group2").map(ele => ({
              ...ele,
              onClick: this.clickRow
            }))}
          />
        </BlockArea>
      </div>
    );
  }
}


export default ProjectSelect;
