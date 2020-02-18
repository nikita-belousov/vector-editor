import * as React from "react";
import styled from "styled-components";
import { sizes, colors } from "../../styles/variables";
import { SidebarSection } from "./SidebarSection";
import { BackgroundSettings } from "./BackgroundSettings";
import { StrokeSettings } from "./StrokeSettings";

const SidebarStyled = styled.div`
  z-index: 2;
  width: ${sizes.sidebarWidth}px;
  max-height: calc(100vh - ${sizes.topBarHeight}px);
  border-left: 1px solid ${colors.lightGrey};
`;

export const Sidebar = () => {
  return (
    <SidebarStyled>
      <SidebarSection title="Background">
        <BackgroundSettings />
      </SidebarSection>
      <SidebarSection title="Stroke">
        <StrokeSettings />
      </SidebarSection>
    </SidebarStyled>
  );
};
