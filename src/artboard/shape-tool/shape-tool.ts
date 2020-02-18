import { Instrument } from "../instrument";
import { ShapePath, ShapeCurve, ShapePoint, Point } from "../pentool/path";
import { ArtboardEvents, ArtboardModes } from "../artboard/types";
import { ArtboardObject } from "../object";
import { ObjectTypes } from "../object/types";

export class ShapeTool extends Instrument {
  public displayName = "Shape Tool";
  public objectTypes = [ObjectTypes.Path];
  public eventHandlers = {
    [ArtboardEvents.SetCreateMode]: this.handleSetNormalMode.bind(this),
    [ArtboardEvents.SetEditMode]: this.handleSetEditPathMode.bind(this)
  };

  private activeShape = {};

  public getObjects() {
    return [];
  }

  public handlePick() {}

  private handleSetNormalMode(object: ArtboardObject) {
    if (object.type === ObjectTypes.Path) {
      (object as ShapePath).setMode(ArtboardModes.Normal);
    }
  }

  private handleSetEditPathMode(object: ArtboardObject) {
    if (object.type === ObjectTypes.Path) {
      (object as ShapePath).setMode(ArtboardModes.EditPath);
    }
  }
}
