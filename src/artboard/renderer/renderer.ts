import { Entity } from "../entity";
import { RendererEvents } from "./types";
import { Background } from "../background";
import { Cursor } from "../cursor/cursor";
import { MouseSelection } from "../select/mouse-selection";
import { ArtboardObject } from "../object";
import { ArtboardEvents } from "../artboard/types";
import { Rectangle } from "../rectangle";

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
  objects: Readonly<ArtboardObject[]>;
}

export class Renderer extends Entity {
  public displayName = "Renderer";

  private screenWidth!: number;
  private screenHeight!: number;
  private backgroundCtx!: CanvasRenderingContext2D;
  private cursorCtx!: CanvasRenderingContext2D;
  private selectionCtx!: CanvasRenderingContext2D;
  private artboardCtx!: CanvasRenderingContext2D;
  private background!: Background;
  private cursor!: Cursor;
  private mouseSelection!: MouseSelection;
  private objects!: Readonly<ArtboardObject[]>;

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
      [ArtboardEvents.SetWidth]: w => (this.screenWidth = w),
      [ArtboardEvents.SetHeight]: h => (this.screenHeight = h),
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
    const rects = objects.map(object => object.getRect());
    const dirtyRect = Rectangle.getSelectionRect(rects);

    this.artboardCtx.clearRect(
      0,
      0,
      dirtyRect.getWidth(),
      dirtyRect.getHeight()
    );

    objects.forEach(object => {
      object.render(this.artboardCtx);
    });
  }
}
