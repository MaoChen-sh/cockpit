import React, { PureComponent } from "react";
import { HeaderTemp as Header, TableTemp as Table } from "view/components";
import { BlockArea } from "components";

class TablePageTemplate extends PureComponent {
  render() {
    return (
      <>
        <Header small {...this.headerProps} />
        <BlockArea title={this.title}>
          <Table noArrow data={this.tableData} columns={this.tableColumns} />
        </BlockArea>
      </>
    );
  }
}

export default TablePageTemplate;
