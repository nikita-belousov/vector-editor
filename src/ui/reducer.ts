import { combineReducers } from "redux";
import { ICoreState, coreReducer } from "./model/core/reducer";
import {
  IInstrumentsPanelState,
  instrumentsPanelReducer
} from "./model/instruments-panel/reducer";

export interface IState {
  core: ICoreState;
  instrumentsPanel: IInstrumentsPanelState;
}

export const reducer = combineReducers({
  core: coreReducer,
  instrumentsPanel: instrumentsPanelReducer
});
