import { MouseEvents } from "./mouse/types";

export type ObjectId = string;
export type PointId = string;
export type ControlPointId = string;
export type CurveId = string;
export type PathId = string;

export enum ObjectTypes {
  Path = "Path"
}

export interface IObject<T = any> {
  type: ObjectTypes;
  data: T;
}

export interface ICoords {
  x: number;
  y: number;
}

export interface IPoint extends ICoords {}

export interface IControlPoint extends IPoint {}

export interface ICurvePoint {
  point: PointId;
  controlPoint: PointId;
}

export interface ICurve {
  previous: CurveId | null;
  next: CurveId | null;
  start: ICurvePoint;
  end: ICurvePoint;
  completed?: boolean;
  display?: boolean;
}

export interface IPath {
  points: PointId[];
  controlPoints: ControlPointId[];
  curves: CurveId[];
  start: CurveId;
  end: CurveId;
}

export interface IStyles {
  [key: string]: any;
}

export interface IStyleSheet {
  point: IStyles;
  controlPoint: IStyles;
  controlLine: IStyles;
  curve: IStyles;
}

export interface IDragData {
  dragging: boolean;
  path: PathId | null;
  point: PointId | null;
  isControl: boolean | null;
  position: ICoords | null;
}

export enum PathMode {
  draw = "draw",
  edit = "edit"
}

export type Events = MouseEvents;

export interface IMousePayload {
  mouseX: number;
  mouseY: number;
}

export interface IMouseDownPayload extends IMousePayload {}

export interface IMouseUpPayload extends IMousePayload {}

export interface IMouseMovePayload extends IMousePayload {}

export interface IKeyboardState {
  ctrl: boolean;
  alt: boolean;
}
