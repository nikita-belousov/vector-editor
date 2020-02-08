import { Entity } from "../entity";

export abstract class RenderableEntity extends Entity {
  public abstract render(ctx: CanvasRenderingContext2D): void;
}
