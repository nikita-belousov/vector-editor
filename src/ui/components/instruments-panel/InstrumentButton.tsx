import * as React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useAction } from "../../utils/hooks";
import { getActiveInstrument } from "../../model/instruments-panel/selectors";
import { SetActiveInstrument } from "../../model/instruments-panel/actions";
import { Instruments } from "../../../artboard/instruments-panel/types";
import { PanelButton } from "./PanelButton";

interface InstrumentButtonProps {
  name: string;
  instrument: Instruments;
  icon: IconDefinition;
  shortcut: string;
}

export const InstrumentButton: React.FC<InstrumentButtonProps> = ({
  name,
  instrument,
  icon,
  shortcut
}) => {
  const selectedInstrument = useSelector(getActiveInstrument);
  const setActiveInstrument = useAction(SetActiveInstrument);

  return (
    <PanelButton
      title={name}
      icon={icon}
      shortcut={shortcut}
      active={selectedInstrument === instrument}
      onClick={() => setActiveInstrument(instrument)}
    />
  );
};
