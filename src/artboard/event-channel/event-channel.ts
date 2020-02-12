import { AppStore } from "../../ui/store";
import { Events } from "../event-channel/types";
import { EventCallback } from "./types";
import { reduxMappings } from "./redux-mappings";

export class EventChannel {
  private listenersByEvent!: { [key in Events]?: EventCallback[] };

  constructor() {
    this.listenersByEvent = {};
  }

  public getEmitter(eventType: Events): EventCallback {
    const self = this;
    return function(payload) {
      self.emit(eventType, payload);
    };
  }

  public registerHandler(eventName: Events, handler: EventCallback) {
    const { listenersByEvent: listeners } = this;
    (listeners[eventName] || (listeners[eventName] = [])).push(handler);
  }

  public patchStore(store: AppStore): AppStore {
    const self = this;
    const next = store.dispatch;

    store.dispatch = action => {
      const event = reduxMappings.get(action.type);
      if (event !== undefined) {
        self.emit(event, action.payload);
      }
      return next(action);
    };

    return store;
  }

  private emit(event: Events, payload?: any) {
    const { listenersByEvent } = this;
    const listeners = listenersByEvent[event];

    if (listeners !== undefined) {
      listeners.forEach(handler => {
        handler(payload);
      });
    }
  }
}
