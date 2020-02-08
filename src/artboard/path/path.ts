import { Object } from "../object";
import { IRect } from "../types";

export class Path extends Object {
  // TODO: implement
  public getRect(): IRect {
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    };
  }
}
