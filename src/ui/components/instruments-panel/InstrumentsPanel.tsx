import * as React from "react";
import styled from "styled-components";
import {
  faBars,
  faSquare,
  faCircle,
  faPenNib,
  faStar,
  faPencilAlt,
  faMousePointer
} from "@fortawesome/free-solid-svg-icons";
import { Instruments } from "../../../artboard/instruments-panel/types";
import { PanelButton } from "./PanelButton";
import { InstrumentButton } from "./InstrumentButton";
import { InstrumentsGroup } from "./InstrumentsGroup";
import { DropdownSelectItem } from "../dropdown";

const Container = styled.div`
  display: flex;
`;

export const InstrumentsPanel: React.FC = () => {
  return (
    <Container>
      <PanelButton title="Settings" icon={faBars} />
      <InstrumentsGroup>
        <DropdownSelectItem
          title="Rectangle"
          value={Instruments.Rectangle}
          icon={faSquare}
          legend="R"
        />
        <DropdownSelectItem
          title="Circle"
          value={Instruments.Ellipse}
          icon={faCircle}
          legend="O"
        />
        <DropdownSelectItem
          title="Star"
          value={Instruments.Star}
          icon={faStar}
        />
      </InstrumentsGroup>
      <InstrumentButton
        name="Select"
        instrument={Instruments.Select}
        icon={faMousePointer}
        shortcut="V"
      />
      <InstrumentsGroup>
        <DropdownSelectItem
          title="Pen"
          value={Instruments.Pen}
          icon={faPenNib}
          legend="P"
        />
        <DropdownSelectItem
          title="Pencil"
          value={Instruments.Pencil}
          icon={faPencilAlt}
          legend="Shift+P"
        />
      </InstrumentsGroup>
    </Container>
  );
};
