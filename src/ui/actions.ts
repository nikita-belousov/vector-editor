import { CoreActionType, CoreAction } from "./model/core/actions";
import {
  InstrumentsPanelActionType,
  InstrumentsPanelAction
} from "./model/instruments-panel/actions";
import { ArtboardAction, ArtboardActionType } from "./model/artboard/actions";

export type AppActionType =
  | CoreActionType
  | InstrumentsPanelActionType
  | ArtboardActionType;

export type AppAction = CoreAction | InstrumentsPanelAction | ArtboardAction;
