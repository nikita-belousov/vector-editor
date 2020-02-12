import { Events } from "../event-channel/types";
import { EventCallbacks } from "../event-channel/types";

export abstract class Entity {
  public abstract displayName: string;

  public emittingEventsTypes: Events[] = [];
  protected eventEmitters: EventCallbacks = {};

  public handlingEventsTypes: Events[] = [];
  public eventHandlers: EventCallbacks = {};

  public setEventEmitters(eventEmitters: EventCallbacks) {
    this.eventEmitters = eventEmitters;
  }

  // TODO: typedef payload
  protected emit(type: Events, payload?: any) {
    const emitter = this.eventEmitters[type];
    if (emitter === undefined) {
      throw new Error(
        `emitter of type ${type} isn't defined in ${this.displayName}`
      );
    }
    emitter(payload);
  }
}
