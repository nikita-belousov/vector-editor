import { Instrument } from "../instrument";
import { IObject, IPath, ObjectTypes } from "../types";
import { PenToolModes, IPenModeState, IBendModeState } from "./types";
import { MouseEvents, MouseEventPayload } from "../mouse/types";
import { ListeningEvents } from "../decorators";
import { IInstrumentConstructorParams } from "../instrument/types";

@ListeningEvents([
  MouseEvents.MouseDown,
  MouseEvents.MouseUp,
  MouseEvents.MouseMove
])
export class PenTool extends Instrument {
  static modes = [PenToolModes.Pen, PenToolModes.Bend];

  public displayName = "Pen Tool";
  public objectTypes!: ObjectTypes[];
  private mode!: PenToolModes;
  private stateByMode!: {
    [PenToolModes.Pen]: IPenModeState;
    [PenToolModes.Bend]: IBendModeState;
  };

  constructor(params: IInstrumentConstructorParams) {
    super(params);

    this.objectTypes = [ObjectTypes.Path];
    this.eventHandlers = {
      [MouseEvents.MouseDown]: this.handleMouseDown,
      [MouseEvents.MouseUp]: this.handleMouseUp,
      [MouseEvents.MouseMove]: this.handleMouseMove
    };
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const objects = this.getObjects(this.objectTypes);

    const paths = objects[ObjectTypes.Path];
    if (paths && paths.length > 0) {
      this.drawPaths(paths as IObject<IPath>[]);
    }
  }

  private initModesState() {
    this.stateByMode = {
      [PenToolModes.Pen]: {},
      [PenToolModes.Bend]: {}
    };
  }

  public handlePick() {
    this.setMode(PenToolModes.Pen);
  }

  protected handleMouseDown(mouseState: MouseEventPayload) {
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

  protected handleMouseUp(mouseState: MouseEventPayload) {}

  protected handleMouseMove(mouseState: MouseEventPayload) {}

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

  private drawPaths(paths: IObject<IPath>[]) {
    paths.forEach(path => {
      // TODO: implement
    });
  }
}
