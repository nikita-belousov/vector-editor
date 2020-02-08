import { MouseEvents, MouseEventPayload } from "../mouse/types";
import {
  InstrumentsEvents,
  InstrumentsEventPayload
} from "../instruments-panel/types";
import { KeyboardEvents, KeyboardEventPayload } from "../keyboard/types";

export type EventEmitter<T extends any = any> = (payload: T) => void;

export type EventHandler<T extends any = any> = (payload: T) => void;

export type EventEmitters = {
  [key in MouseEvents]?: EventEmitter<MouseEventPayload>
} &
  { [key in InstrumentsEvents]?: EventEmitter<InstrumentsEventPayload> } &
  { [key in KeyboardEvents]?: EventEmitter<KeyboardEventPayload> };

export type EventHandlers = {
  [key in MouseEvents]?: EventHandler<MouseEventPayload>
} &
  { [key in InstrumentsEvents]?: EventHandler<InstrumentsEventPayload> } &
  { [key in KeyboardEvents]?: EventEmitter<KeyboardEventPayload> };
