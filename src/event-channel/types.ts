import { MouseEvents, MouseEventPayload } from "../mouse/types";

export type EventEmitter<T extends any = any> = (payload: T) => void;

export type EventHandler<T extends any = any> = (payload: T) => void;

export type EventEmitters = {
  [key in MouseEvents]?: EventEmitter<MouseEventPayload>
};

export type EventHandlers = {
  [key in MouseEvents]?: EventHandler<MouseEventPayload>
};
