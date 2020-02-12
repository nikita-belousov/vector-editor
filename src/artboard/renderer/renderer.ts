import { Entity } from "../entity";
import { RendererEvents } from "./types";
import { ArtboardObject } from "../object";
import { Cursor } from "../cursor/cursor";

interface IRendererConstructorParams {
  screenWidth: number;
  screenHeight: number;
  cursorCtx: CanvasRenderingContext2D;
  artboardCtx: CanvasRenderingContext2D;
  cursor: Cursor;
  objects: ArtboardObject[];
}

export class Renderer extends Entity {
  public displayName = "Renderer";

  private screenWidth!: number;
  private screenHeight!: number;
  private cursorCtx!: CanvasRenderingContext2D;
  private artboardCtx!: CanvasRenderingContext2D;
  private cursor!: Cursor;
  private objects!: ArtboardObject[];

  constructor({
    screenWidth,
    screenHeight,
    cursorCtx,
    artboardCtx,
    cursor,
    objects
  }: IRendererConstructorParams) {
    super();

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.cursorCtx = cursorCtx;
    this.artboardCtx = artboardCtx;
    this.cursor = cursor;
    this.objects = objects;

    this.eventHandlers = {
      [RendererEvents.RenderObjects]: this.renderObjects.bind(this),
      [RendererEvents.RenderCursor]: this.renderCursor.bind(this)
    };
  }

  private renderCursor() {
    this.cursorCtx.clearRect(0, 0, this.screenWidth, this.screenHeight);
    this.cursor.render(this.cursorCtx);
  }

  private renderObjects(objects: ArtboardObject[]) {
    objects.forEach(object => {
      object.render(this.artboardCtx);
    });
  }
}
