import { Rectangle } from "../rectangle";
import { ArtboardObject } from "../object";
import { ObjectTypes } from "../object/types";
import { selectStyles } from "./styles";

export class MouseSelection extends ArtboardObject {
  private selectionRect = new Rectangle();
  private selecting = false;

  constructor() {
    super(ObjectTypes.MouseSelection);
  }

  public getRect(): Rectangle {
    return this.selectionRect;
  }

  public render(ctx: CanvasRenderingContext2D) {
    const { selectionRect } = this;
    const { top, left } = selectionRect.getCoords();
    const width = selectionRect.getWidth();
    const height = selectionRect.getHeight();

    ctx.save();
    ctx.fillStyle = selectStyles.mouseSelection.fill;
    ctx.strokeStyle = selectStyles.mouseSelection.fill;
    ctx.lineWidth = 1;
    ctx.strokeRect(left, top, width, height);
    ctx.globalAlpha = 0.2;
    ctx.fillRect(left, top, width, height);
    ctx.restore();
  }

  public getSelecting(): boolean {
    return this.selecting;
  }

  public setSelecting(selecting: boolean) {
    this.selecting = selecting;
  }

  public resetSelectionRect() {
    this.selectionRect.reset();
  }

  public updateSelectionRect(updater: (selection: Rectangle) => void) {
    updater(this.selectionRect);
  }
}
