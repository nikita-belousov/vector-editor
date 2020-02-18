import uniqueId from "lodash/uniqueId";

export class ShapePoint {
  public id!: string;
  public x!: number;
  public y!: number;

  constructor(x: number, y: number) {
    if (x < 0 || x > 1 || y < 0 || y > 1) {
      throw new Error(
        "invalid set of coordinates, x and y must be float values between 0 and 1"
      );
    }

    this.id = uniqueId("point__");
    this.x = x;
    this.y = y;
  }

  public copy(): ShapePoint {
    return new ShapePoint(this.x, this.y);
  }
}
