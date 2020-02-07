import { Entity } from "./entity";

export abstract class DrawingEntity extends Entity {
  public abstract draw(ctx: CanvasRenderingContext2D): void;
}
