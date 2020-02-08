import { RenderableEntity } from "../renderable-entity";
import { ListeningEvents } from "../decorators";
import { MouseEvents } from "../mouse/types";

@ListeningEvents([MouseEvents.MouseMove])
export class Cursor extends RenderableEntity {
  public displayName = "Cursor";

  constructor() {
    super();

    this.eventHandlers = {
      [MouseEvents.MouseMove]: mouseState => {}
    };
  }

  public init() {}

  public draw(ctx: CanvasRenderingContext2D) {}
}
