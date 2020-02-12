import { CoreActionType, CoreAction } from "./model/core/actions";
import {
  InstrumentsPanelActionType,
  InstrumentsPanelAction
} from "./model/instruments-panel/actions";

export type AppActionType = CoreActionType | InstrumentsPanelActionType;

export type AppAction = CoreAction | InstrumentsPanelAction;
