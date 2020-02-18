import { ICoords } from "../types";

export enum PenToolModes {
  Pen = "Pen",
  Bend = "Bend"
}

export type PointId = string;
export type ControlPointId = string;
export type CurveId = string;
export type PathId = string;

export interface IPathPoint extends ICoords {
  id: PointId;
}

export interface IPathControlPoint extends ICoords {
  id: ControlPointId;
}

export interface IPathCurvePoint {
  point: PointId;
  controlPoint: ControlPointId;
}

export interface IPathCurve {
  previous: CurveId | null;
  next: CurveId | null;
  start: IPathCurvePoint;
  end: IPathCurvePoint;
  completed?: boolean;
  display?: boolean;
}

export interface IPath {
  curves: CurveId[];
  start: CurveId;
  end: CurveId;
}

export interface IPenModeState {}

export interface IBendModeState {}

export interface IPathSettings {
  strokeWidth: number;
  strokeColor: string;
  fillColor: string | null;
}
