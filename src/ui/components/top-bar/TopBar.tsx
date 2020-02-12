import * as React from "react";
import styled from "styled-components";
import { sizes, colors } from "../../styles/variables";
import { InstrumentsPanel } from "../instruments-panel";

const TopBarStyled = styled.div`
  height: ${sizes.topBarHeight};
  background: ${colors.darkGrey};
`;

export const TopBar = () => {
  return (
    <TopBarStyled>
      <InstrumentsPanel />
    </TopBarStyled>
  );
};
