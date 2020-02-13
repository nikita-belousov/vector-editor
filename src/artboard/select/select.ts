import { Instruments } from "../instruments-panel/types";
import { Instrument } from "../instrument";
import { ArtboardObject } from "../object";
import { MouseSelection } from "./mouse-selection";
import { MouseEvents, MouseButtons, IMouseState } from "../mouse/types";
import { RendererEvents } from "../renderer/types";
import { ArtboardEvents } from "../artboard/types";

export class Select extends Instrument {
  public displayName = "select";
  public objectTypes = [];
  public emittingEventsTypes = [
    RendererEvents.RenderMouseSelection,
    RendererEvents.ClearMouseSelection
  ];

  private mouseSelection = new MouseSelection();

  constructor() {
    super(Instruments.Select);

    this.eventHandlers = {
      ...this.eventHandlers,
      [MouseEvents.MouseDown]: this.handleMouseDown.bind(this),
      [MouseEvents.MouseUp]: this.handleMouseUp.bind(this),
      [MouseEvents.MouseMove]: this.handleMouseMove.bind(this),
      [ArtboardEvents.LeaveArtboard]: this.resetMouseSelection.bind(this)
    };
  }

  public getObjects(): ArtboardObject[] {
    return [];
  }

  public getMouseSelection() {
    return this.mouseSelection;
  }

  protected handlePick() {}

  private resetMouseSelection() {
    const { mouseSelection } = this;

    mouseSelection.setSelecting(false);
    mouseSelection.resetSelectionRect();
    this.emit(RendererEvents.ClearMouseSelection);
  }

  private handleMouseDown({ button, coords }: IMouseState) {
    if (!this.active) return;

    const { mouseSelection } = this;
    const { mouseX, mouseY } = coords;

    if (button === MouseButtons.Left) {
      mouseSelection.setSelecting(true);
      mouseSelection.updateSelectionRect(selection => {
        selection.setTop(mouseY);
        selection.setLeft(mouseX);
        selection.setBottom(mouseY);
        selection.setRight(mouseX);
      });
    }
  }

  private handleMouseMove({ coords }: IMouseState) {
    if (!this.active) return;

    const { mouseSelection } = this;
    const { mouseX, mouseY } = coords;

    if (this.mouseSelection.getSelecting()) {
      mouseSelection.updateSelectionRect(selection => {
        selection.setBottom(mouseY);
        selection.setRight(mouseX);
      });
      this.emit(RendererEvents.RenderMouseSelection);
    }
  }

  private handleMouseUp({ button }: IMouseState) {
    if (!this.active) return;

    if (button === MouseButtons.Left && this.mouseSelection) {
      this.resetMouseSelection();
    }
  }
}
