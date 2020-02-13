import { Entity } from "../entity";
import { RendererEvents } from "./types";
import { Cursor } from "../cursor/cursor";
import { MouseSelection } from "../select/mouse-selection";
import { ArtboardObject } from "../object";

interface IRendererConstructorParams {
  screenWidth: number;
  screenHeight: number;
  cursorCtx: CanvasRenderingContext2D;
  selectionCtx: CanvasRenderingContext2D;
  artboardCtx: CanvasRenderingContext2D;
  cursor: Cursor;
  mouseSelection: MouseSelection;
  objects: ArtboardObject[];
}

export class Renderer extends Entity {
  public displayName = "Renderer";

  private screenWidth!: number;
  private screenHeight!: number;
  private cursorCtx!: CanvasRenderingContext2D;
  private selectionCtx!: CanvasRenderingContext2D;
  private artboardCtx!: CanvasRenderingContext2D;
  private cursor!: Cursor;
  private mouseSelection!: MouseSelection;
  private objects!: ArtboardObject[];

  constructor({
    screenWidth,
    screenHeight,
    cursorCtx,
    selectionCtx,
    artboardCtx,
    cursor,
    mouseSelection,
    objects
  }: IRendererConstructorParams) {
    super();

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.cursorCtx = cursorCtx;
    this.selectionCtx = selectionCtx;
    this.artboardCtx = artboardCtx;
    this.cursor = cursor;
    this.mouseSelection = mouseSelection;
    this.objects = objects;

    this.eventHandlers = {
      [RendererEvents.RenderObjects]: this.renderObjects.bind(this),
      [RendererEvents.RenderCursor]: this.renderCursor.bind(this),
      [RendererEvents.ClearCursor]: this.clearCursor.bind(this),
      [RendererEvents.RenderMouseSelection]: this.renderMouseSelection.bind(
        this
      ),
      [RendererEvents.ClearMouseSelection]: this.clearMouseSelection.bind(this)
    };
  }

  private renderCursor() {
    this.clearCursor();
    this.cursor.render(this.cursorCtx);
  }

  private clearCursor() {
    this.cursorCtx.clearRect(0, 0, this.screenWidth, this.screenHeight);
  }

  private renderMouseSelection() {
    this.clearMouseSelection();
    this.mouseSelection.render(this.selectionCtx);
  }

  private clearMouseSelection() {
    this.selectionCtx.clearRect(0, 0, this.screenWidth, this.screenHeight);
  }

  private renderObjects(objects: ArtboardObject[]) {
    objects.forEach(object => {
      object.render(this.artboardCtx);
    });
  }
}
