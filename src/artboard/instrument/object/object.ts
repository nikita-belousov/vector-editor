import { IObjectRect } from "./types";

export abstract class Object {
  public abstract getRect(): IObjectRect;
}
