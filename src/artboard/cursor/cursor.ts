import { Rectangle } from "../rectangle";
import { ArtboardObject } from "../object";
import { ICoords } from "../types";
import { ObjectTypes } from "../object/types";
import { cursorStyles } from "./styles";

export class Cursor extends ArtboardObject {
  public image!: CanvasImageSource;

  constructor(defaultImage: CanvasImageSource) {
    super(ObjectTypes.Cursor);
    this.image = defaultImage;
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
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

  public setImage(image: CanvasImageSource) {
    this.image = image;
  }
}
