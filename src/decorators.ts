import { Events } from "./types";

export function EmittingEvents(events: Events[]) {
  return (constructor: Function) => {
    constructor.prototype.emittingEvents = true;
    constructor.prototype.emittingEventsTypes = events;
  };
}

export function ListeningEvents(events: Events[]) {
  return (constructor: Function) => {
    constructor.prototype.HandlingEvents = true;
    constructor.prototype.handlingEventsTypes = events;
  };
}
