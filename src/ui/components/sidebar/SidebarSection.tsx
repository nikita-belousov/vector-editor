import * as React from "react";
import styled from "styled-components";
import { sizes, colors } from "../../styles/variables";

interface ISidebarSectionProps {
  title: string;
  children?: any;
}

const SidebarSectionStyled = styled.div`
  position: relative;
  padding: ${sizes.sidebarSectionPadding[0]}px
    ${sizes.sidebarSectionPadding[1]}px;
  border-bottom: 1px solid ${colors.lightGrey};
`;

const Title = styled.div`
  font-weight: 600;
  margin-bottom: 12px;
`;

export const SidebarSection = ({ title, children }: ISidebarSectionProps) => {
  return (
    <SidebarSectionStyled>
      <Title>{title}</Title>
      {children}
    </SidebarSectionStyled>
  );
};
