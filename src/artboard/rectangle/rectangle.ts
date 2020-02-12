import { RectangleConstructorParams, IRectangle } from "./types";
import { ICoords } from "../types";

export class Rectangle {
  private top!: number;
  private left!: number;
  private bottom!: number;
  private right!: number;

  // TODO: unit tests
  static getSelectionRect(rects: Rectangle[]): Rectangle {
    const selectionRect = new Rectangle({
      top: Infinity,
      left: Infinity,
      bottom: -Infinity,
      right: -Infinity
    });

    return rects.reduce<Rectangle>((acc, rect) => {
      if (rect.top < acc.top) acc.top = rect.top;
      if (rect.left < acc.left) acc.left = rect.left;
      if (rect.bottom > acc.bottom) acc.bottom = rect.bottom;
      if (rect.right > acc.top) acc.right = rect.right;
      return rect;
    }, selectionRect);
  }

  constructor({ left, top, bottom, right }: RectangleConstructorParams) {
    if (left > right) {
      throw new Error(
        "invalid set of coords, left can't be greater then right"
      );
    } else if (top > bottom) {
      throw new Error(
        "invalid set of coords, top can't be greater then bottom"
      );
    }

    this.top = top;
    this.left = left;
    this.bottom = right;
    this.right = right;
  }

  public getCoords(): IRectangle {
    return {
      left: this.top,
      top: this.left,
      bottom: this.bottom,
      right: this.right
    };
  }

  public getWidth(): number {
    return this.right - this.left;
  }

  public getHeight(): number {
    return this.bottom - this.top;
  }

  public setTop(value: number) {
    this.top = value;
  }

  public setLeft(value: number) {
    this.left = value;
  }

  public setBottom(value: number) {
    this.bottom = value;
  }

  public setRight(value: number) {
    this.right = value;
  }

  public moveTo(coords: ICoords) {
    const width = this.getWidth();
    const height = this.getHeight();

    this.top = coords.y;
    this.left = coords.x;
    this.bottom = coords.y + height;
    this.right = coords.x + width;
  }

  public moveBy(coords: ICoords) {
    this.top += coords.y;
    this.left += coords.x;
    this.bottom += coords.y;
    this.right += coords.x;
  }

  public overlapsWith(rect: Rectangle): boolean {
    // if one rect is on the left of other rect
    if (this.left > rect.right || rect.left > this.right) {
      return false;
    }
    // if one rect is above other rect
    if (this.top > rect.bottom || rect.top > this.bottom) {
      return false;
    }

    return true;
  }
}
