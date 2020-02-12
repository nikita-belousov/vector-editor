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

export type Events =
  | MouseEvents
  | InstrumentsEvents
  | KeyboardEvents
  | ObjectEvents
  | RendererEvents;

export type EventCallback<T extends any = any> = (payload: T) => void;

export type EventCallbacks = {
  [key in MouseEvents]?: EventCallback<MouseEventPayload>
} &
  { [key in InstrumentsEvents]?: EventCallback<InstrumentsEventPayload> } &
  { [key in KeyboardEvents]?: EventCallback<KeyboardEventPayload> } &
  { [key in ObjectEvents]?: EventCallback<ObjectEventsPayload> } & {
    [RendererEvents.RenderObjects]?: EventCallback<ArtboardObject[]>;
  } & { [RendererEvents.RenderCursor]?: EventCallback<void> };

export type ReduxMappings = Map<AppActionType, Events>;
