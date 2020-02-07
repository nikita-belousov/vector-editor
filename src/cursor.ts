import { DrawingEntity } from "./drawing-entity";
import { ListeningEvents } from "./decorators";
import { MouseEvents } from "./mouse/types";

@ListeningEvents([MouseEvents.MouseMove])
export class Cursor extends DrawingEntity {
  public displayName = "Cursor";

  constructor() {
    super();

    this.eventHandlers = {
      [MouseEvents.MouseMove]: (payload: ) => {}
    };
  }

  public init() {}

  public draw(ctx: CanvasRenderingContext2D) {}
}
