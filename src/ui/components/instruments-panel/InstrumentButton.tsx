import * as React from "react";
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

export const InstrumentButton = ({
  instrument,
  active,
  onSelect
}: InstrumentButtonProps) => {
  const icon = iconsByType.get(instrument);
  if (icon === undefined) {
    throw new Error(`icon for instrument ${instrument} not found`);
  }

  const handleClick = React.useCallback(() => {
    if (active) return;
    onSelect();
  }, [active, onSelect]);

  return (
    <div onClick={handleClick}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};
