import { combineReducers } from "redux";
import { ICoreState, coreReducer } from "./model/core/reducer";
import {
  IInstrumentsPanelState,
  instrumentsPanelReducer
} from "./model/instruments-panel/reducer";
import { IArtboardState, artboardReducer } from "./model/artboard/reducer";
import {
  IObjectSettingsState,
  objectSettingsReducer
} from "./model/object-settings/reducer";

export interface IAppState {
  core: ICoreState;
  instrumentsPanel: IInstrumentsPanelState;
  artboard: IArtboardState;
  objectSettings: IObjectSettingsState;
}

export const reducer = combineReducers({
  core: coreReducer,
  instrumentsPanel: instrumentsPanelReducer,
  artboard: artboardReducer,
  objectSettings: objectSettingsReducer
});
