import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import css from "./App.module.css";
import { Artboard } from "../../../artboard/artboard";
import { Instruments } from "../../../artboard/instruments-panel/types";
import { InstrumentsPanel } from "../instruments-panel";
import {
  InstrumentsPanelAction,
  SetActiveInstrument
} from "../../model/instruments-panel/actions";

const ARTBOARD_SIZE = 500;

interface IAppProps {
  artboard: Artboard;
  setActiveInstrument: (instrument: Instruments) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<InstrumentsPanelAction>) => ({
  setActiveInstrument: (instrument: Instruments) => {
    dispatch(new SetActiveInstrument(instrument));
  }
});

class Component extends React.Component<IAppProps> {
  componentDidMount() {
    const { artboard, setActiveInstrument } = this.props;

    artboard.init();
    setActiveInstrument(Instruments.Select);
  }

  render() {
    return (
      <div className={css.layout}>
        <div className={css.instrumentsPanel}>
          <InstrumentsPanel />
        </div>
        <div
          className={css.artboard}
          style={{ width: `${ARTBOARD_SIZE}px`, height: `${ARTBOARD_SIZE}px` }}
        >
          <canvas
            id="cursor"
            className={css.cavas}
            width={ARTBOARD_SIZE}
            height={ARTBOARD_SIZE}
          />
          <canvas
            id="artboard"
            className={css.cavas}
            width={ARTBOARD_SIZE}
            height={ARTBOARD_SIZE}
          />
        </div>
      </div>
    );
  }
}

export const App = connect(
  () => ({}),
  mapDispatchToProps
)(Component);
