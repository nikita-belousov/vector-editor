import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCheck } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../styles/variables";

export interface IDropdownSelectItemProps<T = any> {
  title: string;
  value: T;
  icon: IconDefinition;
  legend?: string;
  selected?: boolean;
  onClick?: (value: T) => void;
}

const ItemStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 25px;
  padding-left: 40px;
  padding-right: 10px;
  background: transparent;
  color: white;
  cursor: default;

  :hover {
    background: ${colors.primary};
  }
`;

const CheckStyled = styled.div`
  position: absolute;
  left: 12px;
  display: flex;
  align-items: center;
  font-size: 8px;
`;

const IconStyled = styled.div``;

const TitleStyled = styled.div`
  margin-left: 8px;
`;

const LegendStyled = styled.div`
  margin-left: auto;
`;

export const DropdownSelectItem: React.FC<IDropdownSelectItemProps> = ({
  title,
  icon,
  legend,
  selected,
  onClick
}) => {
  return (
    <ItemStyled onClick={onClick}>
      {selected ? (
        <CheckStyled>
          <FontAwesomeIcon icon={faCheck} />
        </CheckStyled>
      ) : null}
      <IconStyled>
        <FontAwesomeIcon icon={icon} />
      </IconStyled>
      <TitleStyled>{title}</TitleStyled>
      {legend ? <LegendStyled>{legend}</LegendStyled> : null}
    </ItemStyled>
  );
};
