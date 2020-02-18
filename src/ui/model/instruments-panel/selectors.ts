import { createSelector } from "reselect";
import { IAppState } from "../../reducer";

const getInstrumentsPanel = (state: IAppState) => state.instrumentsPanel;

export const getActiveInstrument = createSelector(
  getInstrumentsPanel,
  instrumentsPanel => instrumentsPanel.active
);
