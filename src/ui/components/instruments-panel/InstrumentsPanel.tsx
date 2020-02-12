import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IState } from "../../reducer";
import { Instruments } from "../../../artboard/instruments-panel/types";
import { InstrumentButton } from "./InstrumentButton";
import {
  InstrumentsPanelAction,
  SetActiveInstrument
} from "../../model/instruments-panel/actions";

interface InstrumentsPanelStateProps {
  active: Instruments | null;
}

interface InstrumentsPanelDispatchProps {
  setActiveInstrument: (instrument: Instruments) => void;
}

const mapStateToProps = (state: IState) => ({
  acitve: state.instrumentsPanel.active
});

const mapDispatchToProps = (dispatch: Dispatch<InstrumentsPanelAction>) => ({
  setActiveInstrument: (instrument: Instruments) => {
    dispatch(new SetActiveInstrument(instrument));
  }
});

class Component extends React.Component<
  InstrumentsPanelStateProps & InstrumentsPanelDispatchProps
> {
  selectInstrument = (instrument: Instruments) => {
    const { setActiveInstrument } = this.props;
    setActiveInstrument(instrument);
  };

  render() {
    const { active } = this.props;

    return (
      <div>
        <InstrumentButton
          instrument={Instruments.Select}
          active={active === Instruments.Select}
          onSelect={() => this.selectInstrument(Instruments.Select)}
        />
        <InstrumentButton
          instrument={Instruments.PenTool}
          active={active === Instruments.PenTool}
          onSelect={() => this.selectInstrument(Instruments.PenTool)}
        />
      </div>
    );
  }
}

export const InstrumentsPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
