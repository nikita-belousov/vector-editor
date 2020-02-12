import { Rectangle } from "../rectangle";
import { ArtboardObject } from "../object";
import { ICoords } from "../types";
import { ObjectTypes } from "../object/types";
import { cursorStyles } from "./styles";

export class Cursor extends ArtboardObject {
  constructor() {
    super(ObjectTypes.Cursor);
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = cursorStyles.color;
    ctx.fillRect(
      this.coords.x,
      this.coords.y,
      cursorStyles.width,
      cursorStyles.height
    );
  }

  public getRect() {
    return new Rectangle({ left: 0, top: 0, bottom: 0, right: 0 });
  }

  public setCoords({ x, y }: ICoords) {
    this.coords.x = x;
    this.coords.y = y;
  }
}
