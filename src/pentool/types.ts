import { ICoords } from "../types";

export enum PenToolModes {
  Pen = "Pen",
  Bend = "Bend"
}

export type PathPointId = string;
export type PathControlPointId = string;
export type PathCurveId = string;
export type PathPathId = string;

export interface IPathPoint extends ICoords {
  id: PathPointId;
}

export interface IPathControlPoint extends ICoords {
  id: PathControlPointId;
}

export interface IPathCurvePoint {
  point: PathPointId;
  controlPoint: PathControlPointId;
}

export interface IPathCurve {
  previous: PathCurveId | null;
  next: PathCurveId | null;
  start: IPathCurvePoint;
  end: IPathCurvePoint;
  completed?: boolean;
  display?: boolean;
}

export interface IPath {
  curves: PathCurveId[];
  start: PathCurveId;
  end: PathCurveId;
}

export interface IPenModeState {}

export interface IBendModeState {}
