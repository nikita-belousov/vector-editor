import { Events } from "./types";
import { EventEmitters, EventHandlers } from "./event-channel/types";

export abstract class Entity {
  public abstract displayName: string;

  public emittingEvents = false;
  public emittingEventsTypes: Events[] = [];
  protected eventEmitters: EventEmitters = {};

  public handlingEvents = false;
  public handlingEventsTypes = [];
  public eventHandlers: EventHandlers = {};

  public setEventEmitters(eventEmitters: EventEmitters) {
    this.eventEmitters = eventEmitters;
  }
}
