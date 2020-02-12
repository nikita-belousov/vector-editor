import { Entity } from "../entity";
import { MouseEvents, MouseEventPayload } from "../mouse/types";
import { RendererEvents } from "../renderer/types";
import { Cursor } from "./cursor";

export class CursorManager extends Entity {
  public displayName = "Cursor";
  public cursor: Cursor;
  public emittingEventsTypes = [RendererEvents.RenderCursor];

  constructor() {
    super();

    this.eventHandlers = {
      [MouseEvents.MouseMove]: this.handleMouseMove.bind(this)
    };

    this.cursor = new Cursor();
  }

  public getCursor(): Cursor {
    return this.cursor;
  }

  public handleMouseMove(coords: MouseEventPayload) {
    const {
      coords: { mouseX, mouseY }
    } = coords;

    this.cursor.setCoords({ x: mouseX, y: mouseY });
    this.emit(RendererEvents.RenderCursor);
  }
}
