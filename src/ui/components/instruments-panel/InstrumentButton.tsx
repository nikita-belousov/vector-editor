import * as React from "react";
import styled from "styled-components";
import { sizes, colors } from "../../styles/variables";
import { Instruments } from "../../../artboard/instruments-panel/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenNib,
  faMousePointer,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

interface InstrumentButtonProps {
  instrument: Instruments;
  active: boolean;
  onSelect: () => void;
}

const iconsByType: Map<Instruments, IconDefinition> = new Map([
  [Instruments.PenTool, faPenNib],
  [Instruments.Select, faMousePointer]
]);

interface IButtonProps {
  active: boolean;
  onMouseDown: () => void;
}

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${sizes.topBarHeight};
  height: ${sizes.topBarHeight};
  color: ${colors.white};
  background: ${(props: IButtonProps) =>
    props.active ? colors.primary : colors.darkGrey};

  :hover {
    background: ${(props: IButtonProps) =>
      props.active ? colors.primary : colors.black};
  }

  :active {
    background: ${colors.primary};
  }
`;

export const InstrumentButton = ({
  instrument,
  active,
  onSelect
}: InstrumentButtonProps) => {
  const icon = iconsByType.get(instrument);
  if (icon === undefined) {
    throw new Error(`icon for instrument ${instrument} not found`);
  }

  const handleMouseDown = React.useCallback(() => {
    if (active) return;
    onSelect();
  }, [active, onSelect]);

  return (
    <Button active={active} onMouseDown={handleMouseDown}>
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};
