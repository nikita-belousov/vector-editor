import { Events } from "../types";
import { EventEmitter, EventHandler } from "./types";

export class EventChannel {
  private listenersByEvent!: { [key in Events]?: EventHandler[] };

  constructor() {
    this.listenersByEvent = {};
  }

  public getEmitter(eventType: Events): EventEmitter {
    const self = this;
    return function(payload) {
      self.emit(eventType, payload);
    };
  }

  public registerListener(eventName: Events, handler: EventHandler) {
    const { listenersByEvent: listeners } = this;
    (listeners[eventName] || (listeners[eventName] = [])).push(handler);
  }

  private emit(eventType: Events, payload: any) {
    const { listenersByEvent } = this;
    const listeners = listenersByEvent[eventType];

    if (listeners !== undefined) {
      listeners.forEach(handler => {
        handler(payload);
      });
    }
  }
}
