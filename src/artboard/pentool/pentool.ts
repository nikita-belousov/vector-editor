import { Instrument } from "../instrument";
import { PenToolModes, IPenModeState, IBendModeState } from "./types";
import { MouseEvents, MouseEventPayload } from "../mouse/types";
import { Instruments } from "../instruments-panel/types";
import { ObjectTypes } from "../object/types";
import { ArtboardObject } from "../object";

export class PenTool extends Instrument {
  static modes = [PenToolModes.Pen, PenToolModes.Bend];

  public displayName = "Pen Tool";
  public objectTypes!: ObjectTypes[];
  private mode!: PenToolModes;
  private stateByMode!: {
    [PenToolModes.Pen]: IPenModeState;
    [PenToolModes.Bend]: IBendModeState;
  };

  constructor() {
    super(Instruments.PenTool);

    this.objectTypes = [ObjectTypes.Path];

    this.eventHandlers = {
      ...this.eventHandlers,
      [MouseEvents.MouseDown]: this.handleMouseDown.bind(this),
      [MouseEvents.MouseUp]: this.handleMouseUp.bind(this),
      [MouseEvents.MouseMove]: this.handleMouseMove.bind(this)
    };
  }

  // TODO: implement
  public getObjects(): ArtboardObject[] {
    return [];
  }

  protected handlePick() {
    this.setMode(PenToolModes.Pen);
  }

  protected handleMouseDown(mouseState: MouseEventPayload) {
    if (!this.active) return;

    switch (this.mode) {
      case PenToolModes.Pen:
        this.handleMouseDownPenMode(mouseState);
        break;
      case PenToolModes.Bend:
        this.handleMouseDownBendMode(mouseState);
        break;
      default:
        throw new Error(
          `unrecognized pen tool mode '${
            this.mode
          }' (available modes: ${PenTool.modes.join(", ")})`
        );
    }
  }

  protected handleMouseUp(mouseState: MouseEventPayload) {
    if (!this.active) return;
  }

  protected handleMouseMove(mouseState: MouseEventPayload) {
    if (!this.active) return;
  }

  private initModesState() {
    this.stateByMode = {
      [PenToolModes.Pen]: {},
      [PenToolModes.Bend]: {}
    };
  }

  private setMode(mode: PenToolModes) {
    if (!PenTool.modes.includes(mode)) {
      throw new Error(
        `unrecognized pen tool mode '${mode}' (available modes: ${PenTool.modes.join(
          ", "
        )})`
      );
    }
    this.mode = mode;
  }

  private handleMouseDownPenMode(mouseState: MouseEventPayload) {
    const penModeState = this.stateByMode[PenToolModes.Pen];
  }

  private handleMouseDownBendMode(mouseState: MouseEventPayload) {
    const bendModeState = this.stateByMode[PenToolModes.Bend];
  }
}
