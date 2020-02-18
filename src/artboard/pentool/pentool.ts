import { Instrument } from "../instrument";
import { MouseEvents, MouseEventPayload, MouseButtons } from "../mouse/types";
import {
  KeyboardEvents,
  Keys,
  IKeyboardState,
  KeyboardEventPayload
} from "../keyboard/types";
import { Instruments } from "../instruments-panel/types";
import { ObjectTypes } from "../object/types";
import { ArtboardObject } from "../object";
import { PenToolModes, PathId } from "./types";
import { Path } from "./path";
import { RendererEvents } from "../renderer/types";
import { ObjectsEvents } from "../object/types";

export class PenTool extends Instrument {
  static modes = [PenToolModes.Pen, PenToolModes.Bend];

  public displayName = "Pen Tool";
  public emittingEventsTypes = [
    ObjectsEvents.ObjectCreated,
    ObjectsEvents.ObjectUpdated
  ];
  public objectTypes!: ObjectTypes[];

  private mode!: PenToolModes;
  private activePath: Path | null = null;
  private pathsById: Map<PathId, Path> = new Map();

  constructor() {
    super(Instruments.Pen);

    this.objectTypes = [ObjectTypes.Path];

    this.eventHandlers = {
      ...this.eventHandlers,
      [MouseEvents.MouseDown]: this.handleMouseDown.bind(this),
      [MouseEvents.MouseUp]: this.handleMouseUp.bind(this),
      [MouseEvents.MouseMove]: this.handleMouseMove.bind(this),
      [KeyboardEvents.KeyDown]: this.handleKeyDown.bind(this),
      [ObjectsEvents.SetStrokeColor]: this.handleSetStrokeColor.bind(this),
      [ObjectsEvents.SetStrokeWidth]: this.handleSetStrokeWidth.bind(this)
    };
  }

  // TODO: implement
  public getObjects(): ArtboardObject[] {
    return [];
  }

  protected handlePick() {
    this.mode = PenToolModes.Pen;
  }

  protected handleMouseDown(mouseState: MouseEventPayload) {
    if (!this.active) return;

    const {
      button,
      coords: { mouseX, mouseY }
    } = mouseState;

    if (button !== MouseButtons.Left) return;

    if (this.mode === PenToolModes.Pen && this.activePath === null) {
      this.activePath = this.createNewPath(mouseX, mouseY);
    } else if (this.activePath !== null) {
      this.activePath.handleMouseDown(mouseState);
    }
  }

  protected handleMouseUp(mouseState: MouseEventPayload) {
    if (!this.active) return;

    if (this.activePath !== null) {
      this.activePath.handleMouseUp(mouseState);
    }
  }

  protected handleMouseMove(mouseState: MouseEventPayload) {
    if (!this.active) return;

    if (this.activePath !== null) {
      this.activePath.handleMouseMove(mouseState);
    }
  }

  private handleKeyDown({ key }: KeyboardEventPayload) {
    if (key === Keys.Esc && this.activePath !== null) {
      this.activePath.deleteEndCurve();
      const active = this.activePath;
      this.activePath = null;
      this.emit(ObjectsEvents.ObjectUpdated, active);
    }
  }

  private handleSetStrokeColor(color: string) {
    if (this.activePath) {
      this.activePath.setStrokeColor(color);
      this.emit(ObjectsEvents.ObjectUpdated, this.activePath);
    }
  }

  private handleSetStrokeWidth(width: number) {
    if (this.activePath) {
      this.activePath.setStrokeWidth(width);
      this.emit(ObjectsEvents.ObjectUpdated, this.activePath);
    }
  }

  private createNewPath(x: number, y: number): Path {
    const path = new Path({
      startCoords: { x, y },
      getActivePath: () => this.activePath,
      getCurrentMode: () => this.mode,
      update: (object: ArtboardObject) =>
        this.emit(ObjectsEvents.ObjectUpdated, object)
    });

    this.pathsById.set(path.id, path);
    this.emit(ObjectsEvents.ObjectCreated, path);

    return path;
  }
}
