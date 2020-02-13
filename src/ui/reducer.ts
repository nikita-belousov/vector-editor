import { combineReducers } from "redux";
import { ICoreState, coreReducer } from "./model/core/reducer";
import {
  IInstrumentsPanelState,
  instrumentsPanelReducer
} from "./model/instruments-panel/reducer";
import { IArtboardState, artboardReducer } from "./model/artboard/reducer";

export interface IState {
  core: ICoreState;
  instrumentsPanel: IInstrumentsPanelState;
  artboard: IArtboardState;
}

export const reducer = combineReducers({
  core: coreReducer,
  instrumentsPanel: instrumentsPanelReducer,
  artboard: artboardReducer
});
