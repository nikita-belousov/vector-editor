import uniqueId from "lodash";
import { Rectangle } from "../rectangle";
import { ObjectTypes, ObjectId } from "./types";
import { ICoords } from "../types";

export abstract class ArtboardObject {
  public type!: ObjectTypes;
  public id!: string;

  protected coords: ICoords = { x: 0, y: 0 };

  public abstract render(ctx: CanvasRenderingContext2D): void;
  public abstract getRect(): Rectangle;

  constructor(type: ObjectTypes) {
    this.id = uniqueId("object__");
    this.type = type;
  }

  public getId(): ObjectId {
    return this.id;
  }
}
