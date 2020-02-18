import * as React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { useAction } from "../../utils/hooks";
import { Instruments } from "../../../artboard/instruments-panel/types";
import { SetActiveInstrument } from "../../model/instruments-panel/actions";
import { getActiveInstrument } from "../../model/instruments-panel/selectors";
import { PanelButton } from "./PanelButton";
import { DropdownSelect } from "../dropdown";
import { IDropdownSelectItemProps } from "../dropdown/DropdownSelectItem";

type Children = React.ReactElement<IDropdownSelectItemProps>[];

interface IInstrumentsGroupProps {
  children: Children;
}

interface Instrument {
  name: string;
  icon: IconDefinition;
  shortcut: string;
  onClick: () => void;
}

type InstrumentsData = {
  [key in Instruments]?: {
    name: string;
    icon: IconDefinition;
    shortcut?: string;
  }
};

const ContainerStyled = styled.div``;

export const InstrumentsGroup: React.FC<IInstrumentsGroupProps> = ({
  children
}) => {
  const activeInstrument = useSelector(getActiveInstrument);
  const setActiveInstrument = useAction(SetActiveInstrument);

  const [instrumentsData, setInstrumentsData] = React.useState<InstrumentsData>(
    {}
  );

  const [
    selectedInstrument,
    setSelectedInstrument
  ] = React.useState<Instruments | null>(null);

  const [dropdown, setDropdown] = React.useState<boolean>(false);

  React.useEffect(() => {
    const childrenArr = React.Children.toArray(children) as Children;
    const instrumentsData = childrenArr.reduce<InstrumentsData>(
      (acc, child) => {
        const { title, value, icon, legend } = child.props;
        acc[value as Instruments] = { name: title, icon, shortcut: legend };
        return acc;
      },
      {}
    );

    setInstrumentsData(instrumentsData);
    setSelectedInstrument(childrenArr[0].props.value);
  }, [children]);

  if (selectedInstrument === null) return null;

  const { name, icon, shortcut } = instrumentsData[selectedInstrument]!;

  return (
    <ContainerStyled>
      <PanelButton
        title={name}
        icon={icon}
        shortcut={shortcut}
        active={activeInstrument === selectedInstrument}
        arrow={true}
        onClick={() => setActiveInstrument(selectedInstrument)}
        onArrowClick={() => setDropdown(true)}
      />
      <DropdownSelect
        open={dropdown}
        selected={selectedInstrument}
        onItemClick={({ value }) => {
          console.log(value);
          setSelectedInstrument(value as Instruments);
          setActiveInstrument(value as Instruments);
        }}
        onClose={() => setDropdown(false)}
      >
        {children}
      </DropdownSelect>
    </ContainerStyled>
  );
};
