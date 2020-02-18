import {
  CoreActionType,
  CoreActionCreator,
  CoreAction
} from "./model/core/actions";
import {
  InstrumentsPanelActionType,
  InstrumentsPanelActionCreator,
  InstrumentsPanelAction
} from "./model/instruments-panel/actions";
import {
  ArtboardAction,
  ArtboardActionCreator,
  ArtboardActionType
} from "./model/artboard/actions";

export type AppActionType =
  | CoreActionType
  | InstrumentsPanelActionType
  | ArtboardActionType;

export type AppActionCreator =
  | CoreActionCreator
  | InstrumentsPanelActionCreator
  | ArtboardActionCreator;

export type AppAction = CoreAction | InstrumentsPanelAction | ArtboardAction;
