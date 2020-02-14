import { MouseEvents, MouseEventPayload } from "../mouse/types";
import {
  InstrumentsEvents,
  InstrumentsEventPayload
} from "../instruments-panel/types";
import { KeyboardEvents, KeyboardEventPayload } from "../keyboard/types";
import { ArtboardObject } from "../object";
import { ObjectEvents, ObjectEventsPayload } from "../object/types";
import { RendererEvents } from "../renderer/types";
import { AppActionType } from "../../ui/actions";
import { ArtboardEvents } from "../artboard/types";
import { BackgroundEvents } from "../background/types";

export type Events =
  | MouseEvents
  | InstrumentsEvents
  | KeyboardEvents
  | ObjectEvents
  | RendererEvents
  | ArtboardEvents
  | BackgroundEvents;

export type EventCallback<T extends any = any> = (payload: T) => void;

// TODO: better typedef (maybe Map?)
export type EventCallbacks = { [key in Events]?: EventCallback<any> };

export type ReduxMappings = Map<AppActionType, Events>;
