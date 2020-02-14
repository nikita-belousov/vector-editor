import { Entity } from "../entity";
import { RendererEvents } from "./types";
import { Background } from "../background";
import { Cursor } from "../cursor/cursor";
import { MouseSelection } from "../select/mouse-selection";
import { ArtboardObject } from "../object";

interface IRendererConstructorParams {
  screenWidth: number;
  screenHeight: number;
  backgroundCtx: CanvasRenderingContext2D;
  cursorCtx: CanvasRenderingContext2D;
  selectionCtx: CanvasRenderingContext2D;
  artboardCtx: CanvasRenderingContext2D;

  background: Background;
  cursor: Cursor;
  mouseSelection: MouseSelection;
  objects: ArtboardObject[];
}

export class Renderer extends Entity {
  public displayName = "Renderer";

  private screenWidth!: number;
  private screenHeight!: number;
  private backgroundCtx!: CanvasRenderingContext2D;
  private cursorCtx!: CanvasRenderingContext2D;
  private selectionCtx!: CanvasRenderingContext2D;
  private artboardCtx!: CanvasRenderingContext2D;
  private cursor!: Cursor;
  private background!: Background;
  private mouseSelection!: MouseSelection;
  private objects!: ArtboardObject[];

  constructor({
    screenWidth,
    screenHeight,
    backgroundCtx,
    cursorCtx,
    selectionCtx,
    artboardCtx,
    cursor,
    background,
    mouseSelection,
    objects
  }: IRendererConstructorParams) {
    super();

    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.backgroundCtx = backgroundCtx;
    this.cursorCtx = cursorCtx;
    this.selectionCtx = selectionCtx;
    this.artboardCtx = artboardCtx;
    this.cursor = cursor;
    this.background = background;
    this.mouseSelection = mouseSelection;
    this.objects = objects;

    this.eventHandlers = {
      [RendererEvents.RenderBackground]: this.renderBackground.bind(this),
      [RendererEvents.RenderObjects]: this.renderObjects.bind(this),
      [RendererEvents.RenderCursor]: this.renderCursor.bind(this),
      [RendererEvents.ClearCursor]: this.clearCursor.bind(this),
      [RendererEvents.RenderMouseSelection]: this.renderMouseSelection.bind(
        this
      ),
      [RendererEvents.ClearMouseSelection]: this.clearMouseSelection.bind(this)
    };
  }

  private renderBackground() {
    this.background.render(this.backgroundCtx);
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
