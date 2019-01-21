import React, { PureComponent } from "react";
import { PersonCard } from "view/components";
import { BlockArea as BlockAreaBase } from "components";
import styled from "styled-components";
const BlockArea = styled(BlockAreaBase)`
  padding: 0;
`;
class Mine extends PureComponent {
  render() {
    return (
      <>
        <BlockArea>
          <PersonCard />
        </BlockArea>
        <BlockArea>
          2018.07.02
        </BlockArea>

      </>
    );
  }
}

Mine.propTypes = {};

export default Mine;
