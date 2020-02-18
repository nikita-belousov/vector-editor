import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { sizes, colors } from "../../styles/variables";

interface IPanelButtonProps {
  title: string;
  icon: IconDefinition;
  shortcut?: string;
  active?: boolean;
  arrow?: boolean;
  onArrowClick?: () => void;
  onClick?: () => void;
}

interface IButtonStyledProps {
  active: boolean;
  arrow: boolean;
}

const ContainerStyled = styled.div`
  position: relative;
`;

const ButtonStyled = styled.div<IButtonStyledProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props =>
    props.arrow ? sizes.topBarHeight + 8 : sizes.topBarHeight}px;
  height: ${sizes.topBarHeight}px;
  font-size: 16px;
  color: ${colors.white};
  background: ${props => (props.active ? colors.primary : colors.darkGrey)};

  :hover {
    background: ${props => (props.active ? colors.primary : colors.black)};
  }
`;

const IconStyled = styled.div<{ arrow: boolean }>`
  position: relative;
  right: ${props => (props.arrow ? 5 : 0)}px;
`;

const ArrowStyled = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-right: 6px;

  :hover > * {
    bottom: 0;
  }

  > * {
    position: relative;
    bottom: 2px;
    height: 10px;
    transition: bottom 150ms ease-out;
  }
`;

export const PanelButton = ({
  icon,
  active = false,
  onClick,
  arrow = false,
  onArrowClick
}: IPanelButtonProps) => {
  const handleArrowClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.nativeEvent.stopPropagation();
      e.stopPropagation();
      if (onArrowClick) onArrowClick();
    },
    [onArrowClick]
  );

  return (
    <ContainerStyled>
      <ButtonStyled active={active} arrow={arrow} onClick={onClick}>
        <IconStyled arrow={arrow}>
          <FontAwesomeIcon icon={icon} />
        </IconStyled>
        {arrow ? (
          <ArrowStyled onClick={handleArrowClick}>
            <FontAwesomeIcon icon={faSortDown} />
          </ArrowStyled>
        ) : null}
      </ButtonStyled>
    </ContainerStyled>
  );
};
