import { ArtboardObject } from "../../object";
import { Rectangle } from "../../rectangle";

export class Path extends ArtboardObject {
  // TODO: implement
  public render(ctx: CanvasRenderingContext2D) {}

  // TODO: implement
  public getRect(): Rectangle {
    return new Rectangle({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    });
  }
}
