import { IRect } from "../types";

export abstract class Object {
  public abstract getRect(): IRect;
}
