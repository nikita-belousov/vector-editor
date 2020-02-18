import * as React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Instruments } from "../../../artboard/instruments-panel/types";
import { DropdownMenuItem } from "../dropdown";

export interface IInstrumentsGroupItemProps {
  name: string;
  instrument: Instruments;
  icon: IconDefinition;
  shortcut: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const InstrumentsGroupItem: React.FC<IInstrumentsGroupItemProps> = ({
  name,
  instrument: key,
  icon,
  shortcut,
  onClick
}) => {
  return (
    <DropdownMenuItem
      title={name}
      value={key}
      icon={icon}
      legend={shortcut}
      onClick={onClick}
    />
  );
};
