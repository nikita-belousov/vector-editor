import { ArtboardObject } from "../object";
import { Rectangle } from "../rectangle";
import { ObjectTypes } from "../object/types";

export class Background extends ArtboardObject {
  private color!: string | null;
  private width!: number;
  private height!: number;

  constructor(color = null, width = 0, height = 0) {
    super(ObjectTypes.Background);

    this.color = color;
    this.width = width;
    this.height = height;
  }

  public getRect(): Rectangle {
    return new Rectangle({
      top: 0,
      left: 0,
      bottom: this.height,
      right: this.width
    });
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color || "#FFF";
    ctx.fillRect(0, 0, this.width, this.height);
  }

  public setWidth(width: number) {
    this.width = width;
  }

  public setHeight(height: number) {
    this.height = height;
  }

  public setColor(color: string | null) {
    this.color = color;
  }
}
