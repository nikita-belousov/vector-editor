import { ArtboardObject } from "../../object";
import { ObjectTypes } from "../../object/types";
import { Rectangle } from "../../rectangle";
import { ShapePoint } from "./point";
import { Curve } from "./curve";
import { IPathSettings } from "../types";
import { ICoords } from "../../types";
import { PenToolModes } from "../types";
import { IMouseState, MouseButtons } from "../../mouse/types";
import { ArtboardModes } from "../../artboard/types";

interface IPathParams {
  coords: ICoords;
  curves?: Curve[];
  getCurrentMode: () => ArtboardModes;
  update: (object: ArtboardObject) => void;
}

export class ShapePath extends ArtboardObject {
  private mode: ArtboardModes = ArtboardModes.Normal;
  private curves: Curve[] = [];
  private startCurve: Curve;
  private endCurve!: Curve;
  private movingControl = false;

  private settings: IPathSettings = {
    strokeWidth: 0,
    strokeColor: "#000",
    fillColor: null
  };

  private getCurrentMode!: () => ArtboardModes;
  private update!: (object: ArtboardObject) => void;

  constructor(params: IPathParams) {
    super(ObjectTypes.Path);

    const { x, y } = params.coords;
    const startPoint = new ShapePoint(x, y);
    const curve = this.addNewCurve(startPoint, null);

    this.coords = { x, y };
    this.startCurve = curve;
    this.getCurrentMode = params.getCurrentMode;
    this.update = params.update;

    this.update(this);
  }

  public render(ctx: CanvasRenderingContext2D) {
    const activePath = this.getActivePath();
    let index = 0;
    let curve: Curve | null = this.curves[0];

    while (curve !== null) {
      curve.render({
        ctx,
        settings: this.settings,
        index,
        length: this.curves.length,
        drawing: activePath !== null && activePath.id === this.id
      });
      curve = curve.next;
      index += 1;
    }
  }

  // TODO: implement
  public getRect(): Rectangle {
    return new Rectangle({
      top: 0,
      left: 0,
      bottom: 1500,
      right: 1500
    });
  }

  public handleMouseDown(mouseState: IMouseState) {
    const { endCurve, update: requestRender } = this;
    const mode = this.getCurrentMode();

    if (mode === PenToolModes.Pen) {
      this.addNewCurve(endCurve.endPoint, endCurve);
      endCurve.completed = true;
      requestRender(this);
    } else if (mode === PenToolModes.Bend) {
    }
  }

  public handleMouseUp({ coords, button, lastClick }: IMouseState) {
    const mode = this.getCurrentMode();

    if (mode === PenToolModes.Pen) {
      if (this.movingControl) {
        this.movingControl = false;
      }
      this.endCurve.curveVisible = true;
      this.update(this);
    } else if (mode === PenToolModes.Bend) {
    }
  }

  public handleMouseMove({ coords, button, lastClick }: IMouseState) {
    const { endCurve, update: requestRender } = this;
    const { mouseX, mouseY } = coords;
    const mode = this.getCurrentMode();

    if (mode === PenToolModes.Pen) {
      if (button === MouseButtons.Left) {
        if (this.movingControl) {
          endCurve.moveStartControlPoint(mouseX, mouseY);

          if (endCurve.previous !== null) {
            const dx = endCurve.startPoint.x - mouseX;
            const dy = endCurve.startPoint.y - mouseY;
            endCurve.previous.moveEndControlPoint(
              endCurve.startPoint.x + dx,
              endCurve.startPoint.y + dy
            );
            if (!endCurve.previous.endControlMoved) {
              endCurve.previous.endControlMoved = true;
            }
          }

          requestRender(this);
        } else if (
          lastClick &&
          (Math.abs(coords.mouseX - lastClick.mouseX) > 3 ||
            Math.abs(coords.mouseY - lastClick.mouseY) > 3)
        ) {
          endCurve.startControlMoved = true;
          endCurve.curveVisible = false;
          this.movingControl = true;
        }
      } else {
        endCurve.moveEndPoint(mouseX, mouseY);
        endCurve.moveEndControlPoint(mouseX, mouseY);
        requestRender(this);
      }
    } else if (mode === PenToolModes.Bend) {
    }
  }

  public setMode(mode: ArtboardModes) {
    this.mode = mode;
  }

  public deleteEndCurve() {
    this.curves = this.curves.filter(curve => curve.id !== this.endCurve.id);
    this.endCurve = this.endCurve.previous || this.startCurve;
    this.endCurve.next = null;
  }

  public setStrokeColor(color: string) {
    this.settings.strokeColor = color;
  }

  public setStrokeWidth(width: number) {
    this.settings.strokeWidth = width;
  }

  private addNewCurve(startPoint: ShapePoint, previousCurve: Curve | null) {
    const curve = new Curve(startPoint, previousCurve);
    this.curves.push(curve);
    this.endCurve = curve;

    if (previousCurve !== null) {
      previousCurve.next = curve;
      curve.previous = previousCurve;
    }

    return curve;
  }
}
