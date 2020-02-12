 import React, { Component } from "react";
import mapValues from "lodash/mapValues";
import uniqueId from "lodash/uniqueId";
import {
  ICurvePoint,
  PointId,
  ControlPointId,
  IControlPoint,
  CurveId,
  IStyleSheet,
  ICurve,
  IPoint,
  IPath,
  PathId,
  PathMode,
  IDragData
} from "./types";

import "./styles.css";

interface IAppState {
  pointsById: { [key in PointId]: IPoint };
  controlPointsById: { [key in ControlPointId]: IControlPoint };
  curvesById: { [key in CurveId]: ICurve };
  pathsById: { [key in PathId]: IPath };
}

export default class App extends Component<{}, IAppState> {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private styleSheet!: IStyleSheet;
  private pathMode!: PathMode | null;
  private dragData!: IDragData;
  private activePath!: PathId | null;
  private ctrlKey!: boolean;
  private mouseDown!: boolean;

  state: IAppState = {
    pointsById: {},
    controlPointsById: {},
    curvesById: {},
    pathsById: {}
  };

  componentDidMount() {
    this.init();
    this.draw();
  }

  componentDidUpdate(nextProps: {}, prevState: IAppState) {
    if (this.state !== prevState) {
      this.draw();
    }
  }

  init() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.styleSheet = {
      controlLine: { width: 1, color: "#a5a5a5" },
      point: {
        radius: 4,
        width: 1,
        color: "#18a0fb",
        fill: "#fff",
        arc1: 0,
        arc2: 2 * Math.PI
      },
      controlPoint: {
        size: 6,
        strokeWidth: 1,
        color: "#00f",
        fill: "#fff",
        stroke: "#18a0fb"
      },
      curve: { width: 1, color: "#2d2d2d", colorPotential: "#18a0fb" }
    };

    this.dragData = this.clearDragData();
    this.pathMode = PathMode.draw;
    this.activePath = null;
    this.ctrlKey = false;
    this.mouseDown = false;

    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    window.document.onkeypress = this.handleKeyPress;
    window.document.onkeydown = this.handleKeyDown;
    window.document.onkeyup = this.handleKeyUp;
    
    this.canvas.onmousedown = this.handleMouseDown;
    this.canvas.onmousemove = this.hanleMouseMove;
    this.canvas.onmouseup = this.handleMouseUp;
    this.canvas.onmouseout = this.handleMouseUp;
  }

  drawControlLines(pathId: PathId) {
    if (pathId !== this.activePath) return;

    const { ctx, styleSheet } = this;
    const { curvesById, pointsById, controlPointsById } = this.state;
    const { curves } = this.state.pathsById[pathId];

    ctx.lineWidth = styleSheet.controlLine.width;
    ctx.strokeStyle = styleSheet.controlLine.color;

    curves.forEach(curveId => {
      const { start, end } = curvesById[curveId];
      if (end === null) return;

      const startPoint = pointsById[start.point];
      const startControl = controlPointsById[start.controlPoint];
      const endPoint = pointsById[end.point];
      const endControl = controlPointsById[end.controlPoint];

      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(startControl.x, startControl.y);
      ctx.moveTo(endPoint.x, endPoint.y);
      ctx.lineTo(endControl.x, endControl.y);
      ctx.stroke();
    });
  }

  drawCurves(pathId: PathId) {
    const { ctx, styleSheet } = this;
    const { curvesById, pointsById, controlPointsById } = this.state;
    const path = this.state.pathsById[pathId];
    const { curves } = path;

    curves
      .filter(curveId => {
        const curve = curvesById[curveId];
        return curve.display;
      })
      .forEach(curveId => {
        const { start, end, completed: isComplete } = curvesById[curveId];
        if (end === null) return;

        ctx.lineWidth = styleSheet.curve.width;
        ctx.strokeStyle = isComplete
          ? styleSheet.curve.color
          : styleSheet.curve.colorPotential;

        const startPoint = pointsById[start.point];
        const startControl = controlPointsById[start.controlPoint];
        const endPoint = pointsById[end.point];
        const endControl = controlPointsById[end.controlPoint];

        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.bezierCurveTo(
          startControl.x,
          startControl.y,
          endControl.x,
          endControl.y,
          endPoint.x,
          endPoint.y
        );
        ctx.stroke();
      });
  }

  drawPoint(x: number, y: number) {
    const { ctx, styleSheet } = this;
    ctx.beginPath();
    ctx.arc(
      x,
      y,
      styleSheet.point.radius,
      styleSheet.point.arc1,
      styleSheet.point.arc2,
      true
    );
    ctx.fill();
    ctx.stroke();
  }

  drawControlPoint(x: number, y: number) {
    const {
      ctx,
      styleSheet: { controlPoint }
    } = this;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((45 * Math.PI) / 180);

    // stroke rect
    ctx.fillStyle = controlPoint.stroke;
    ctx.fillRect(
      -controlPoint.size / 2 - controlPoint.strokeWidth,
      -controlPoint.size / 2 - controlPoint.strokeWidth,
      controlPoint.size + controlPoint.strokeWidth * 2,
      controlPoint.size + controlPoint.strokeWidth * 2
    );

    // fill rect
    ctx.fillStyle = controlPoint.fill;
    ctx.fillRect(
      -controlPoint.size / 2,
      -controlPoint.size / 2,
      controlPoint.size,
      controlPoint.size
    );

    ctx.restore();
  }

  drawPoints(pathId: PathId) {
    const { ctx, styleSheet } = this;
    const { pointsById } = this.state;
    const { points } = this.state.pathsById[pathId];

    ctx.lineWidth = styleSheet.point.width;
    ctx.strokeStyle = styleSheet.point.color;
    ctx.fillStyle = styleSheet.point.fill;

    const drawnPoints: PointId[] = [];

    // points
    points.forEach(pointId => {
      if (pointId in drawnPoints) return;
      const point = pointsById[pointId];
      this.drawPoint(point.x, point.y);
      drawnPoints.push(pointId);
    });
  }

  drawControlPoints(pathId: PathId) {
    if (pathId !== this.activePath) return;

    const { ctx, styleSheet } = this;
    const { controlPointsById } = this.state;
    const { controlPoints } = this.state.pathsById[pathId];

    ctx.fillStyle = styleSheet.controlPoint.fill;

    // control points
    controlPoints.forEach(pointId => {
      const point = controlPointsById[pointId];
      this.drawControlPoint(point.x, point.y);
    });
  }

  drawPaths() {
    const { pathsById: paths } = this.state;

    Object.keys(paths).forEach(pathId => {
      this.drawControlLines(pathId);
      this.drawCurves(pathId);
      this.drawPoints(pathId);
      this.drawControlPoints(pathId);
    });
  }

  draw() {
    const { canvas, ctx } = this;

    ctx.fillStyle = "#E5E5E5";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.drawPaths();
  }

  handleMouseDown = (e: MouseEvent) => {
    const { x, y } = this.getMouseRelativePosition(e);
    this.mouseDown = true;

    if (this.ctrlKey) {
      const draggingPoint =
        this.getPointUnderCursor(x, y, true) ||
        this.getPointUnderCursor(x, y, false);
      if (draggingPoint !== undefined) {
        this.activePath = this.getPathByPoint(draggingPoint);
        this.dragStart(draggingPoint, x, y);
      }
    } else if (this.activePath === null) {
      const pathId = this.makeNewPath(x, y);
      this.pathMode = PathMode.draw;
      this.activePath = pathId;
    } else {
      this.setEndCurveComplete(this.activePath);
      this.addCurve(this.activePath);
    }
  };

  hanleMouseMove = (e: MouseEvent) => {
    const { activePath, pathMode } = this;
    const { curvesById } = this.state;
    const { x, y } = this.getMouseRelativePosition(e);

    if (this.dragData.dragging) {
      this.dragging(e);
    } else if (activePath === null) {
      return;
    } else if (pathMode === PathMode.draw && this.mouseDown) {
      const lastCurveId = this.getEndCurve(activePath);
      const lastCurve = curvesById[lastCurveId];
      this.updateCurveData(lastCurveId, { display: false });
      this.moveControlPointTo(lastCurve.start.controlPoint, x, y);

      if (lastCurve.previous !== null) {
        const previousCurve = curvesById[lastCurve.previous];
        this.reflectControlPoint(
          previousCurve.end.controlPoint,
          lastCurve.start.point,
          x,
          y
        );
      }
    } else if (pathMode === PathMode.draw) {
      const lastCurveId = this.getEndCurve(activePath);
      const lastCurve = curvesById[lastCurveId];
      this.moveCurvePointTo(lastCurve.end, x, y);
    }
  };

  handleMouseUp = (e: MouseEvent) => {
    const { curvesById } = this.state;
    this.mouseDown = false;

    if (this.dragData.dragging) {
      this.dragEnd(e);
    } else if (!this.ctrlKey && this.activePath !== null) {
      const lastCurveId = this.getEndCurve(this.activePath);
      const lastCurve = curvesById[lastCurveId];
      if (!lastCurve.display) {
        this.updateCurveData(lastCurveId, { display: true });
      }
    }
  };

  handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "q":
        if (this.pathMode === PathMode.draw) {
          if (this.activePath) {
            this.removeEndCurve(this.activePath);
          }
          this.activePath = null;
          this.pathMode = PathMode.edit;
        }
        break;
    }
  };

  handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Control":
        this.ctrlKey = true;
    }
  };

  handleKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Control":
        this.ctrlKey = false;
    }
  };

  reflectControlPoint = (
    controlPointId: ControlPointId,
    centerPointId: PointId,
    x: number,
    y: number
  ) => {
    const { pointsById } = this.state;
    const centerPoint = pointsById[centerPointId];
    const { x: centerX, y: centerY } = centerPoint;
    const dx = centerX - x;
    const dy = centerY - y;

    this.updateControlPointPosition(controlPointId, centerX + dx, centerY + dy);
  };

  moveCurvePointTo = (curvePoint: ICurvePoint, x: number, y: number) => {
    this.setState(state => ({
      pointsById: {
        ...state.pointsById,
        [curvePoint.point]: { x, y }
      },
      controlPointsById: {
        ...state.controlPointsById,
        [curvePoint.controlPoint]: { x, y }
      }
    }));
  };

  moveControlPointTo = (id: ControlPointId, x: number, y: number) => {
    this.setState(state => ({
      controlPointsById: {
        ...state.controlPointsById,
        [id]: { x, y }
      }
    }));
  };

  movePointTo = (id: PointId, x: number, y: number) => {
    this.setState(state => ({
      pointsById: {
        ...state.pointsById,
        [id]: { x, y }
      }
    }));
  };

  getEndCurve = (pathId: PathId): CurveId => {
    const { pathsById, curvesById } = this.state;
    const path = pathsById[pathId];

    let curveId = path.start;
    let curve = curvesById[curveId];
    while (curve.next !== null) {
      curveId = curve.next;
      curve = curvesById[curveId];
    }

    return curveId;
  };

  setEndCurveComplete = (pathId: PathId) => {
    const endCurveId = this.getEndCurve(pathId);
    this.updateCurveData(endCurveId, { completed: true });
  };

  removeEndCurve = (pathId: PathId) => {
    const endCurveId = this.getEndCurve(pathId);
    this.removeCurve(endCurveId, pathId);
  };

  makeNewPath = (x: number, y: number): PathId => {
    const startPointId = uniqueId("point__");
    const endPointId = uniqueId("point__");
    const startControlPointId = uniqueId("controlPoint__");
    const endControlPointId = uniqueId("controlPoint__");
    const curveId = uniqueId("curve__");
    const pathId = uniqueId("path__");

    const startPoint = { x, y };
    const endPoint = { x, y };
    const startControlPoint = { x, y };
    const endControlPoint = { x, y };

    // REF: duplicates `addCurve` logic
    const curve = {
      previous: null,
      next: null,
      start: {
        point: startPointId,
        controlPoint: startControlPointId
      },
      end: {
        point: endPointId,
        controlPoint: endControlPointId
      },
      completed: false,
      display: true
    } as ICurve;

    const path = {
      points: [startPointId, endPointId],
      controlPoints: [startControlPointId, endControlPointId],
      curves: [curveId],
      start: curveId,
      end: curveId
    } as IPath;

    this.setState(state => ({
      ...state,
      pointsById: {
        ...state.pointsById,
        [startPointId]: startPoint,
        [endPointId]: endPoint
      },
      controlPointsById: {
        ...state.controlPointsById,
        [startControlPointId]: startControlPoint,
        [endControlPointId]: endControlPoint
      },
      curvesById: {
        ...state.curvesById,
        [curveId]: curve
      },
      pathsById: {
        ...state.pathsById,
        [pathId]: path
      }
    }));

    return pathId;
  };

  addCurve = (pathId: PathId) => {
    const { curvesById, pointsById } = this.state;
    const lastCurveId = this.getEndCurve(pathId);
    const lastCurve = curvesById[lastCurveId];

    const curveId = uniqueId("curve__");
    const startPointId = lastCurve.end.point;
    const startPoint = pointsById[startPointId];
    const startControlPointId = uniqueId("controlPoint__");
    const endPointId = uniqueId("point__");
    const endControlPointId = uniqueId("controlPoint__");

    const curve = {
      previous: lastCurveId,
      next: null,
      start: {
        point: startPointId,
        controlPoint: startControlPointId
      },
      end: {
        point: endPointId,
        controlPoint: endControlPointId
      },
      completed: false,
      display: true
    };

    // updating previous curve
    this.updateCurveData(lastCurveId, { next: curveId });

    // updating points
    this.addPoint(endPointId, { ...startPoint });
    this.addControlPoint(startControlPointId, { ...startPoint });
    this.addControlPoint(endControlPointId, { ...startPoint });

    // updating curves
    this.setState(state => ({
      ...state,
      curvesById: {
        ...state.curvesById,
        [curveId]: curve
      }
    }));

    // updating path
    this.updatePathData(pathId, data => ({
      ...data,
      curves: [...data.curves, curveId],
      points: [...data.points, endPointId],
      controlPoints: [
        ...data.controlPoints,
        startControlPointId,
        endControlPointId
      ]
    }));
  };

  removeCurve = (curveId: CurveId, pathId: PathId) => {
    const { curvesById } = this.state;

    // updating previous curve
    const curve = curvesById[curveId];
    this.updateCurveData(curve.previous as CurveId, { next: null });

    // updating path
    this.updatePathData(pathId, data => ({
      ...data,
      curves: data.curves.filter(id => id !== curveId),
      points: data.points.filter(id => id !== curve.end.point),
      controlPoints: data.controlPoints.filter(
        id => id !== curve.start.controlPoint && id !== curve.end.controlPoint
      )
    }));

    // updating points
    this.removePoint(curve.end.point);
    this.removeControlPoint(curve.start.controlPoint);
    this.removeControlPoint(curve.end.controlPoint);

    // updating curves
    this.setState(state => {
      const { [curveId]: deleted, ...curves } = state.curvesById;
      return {
        ...state,
        curvesById: curves
      };
    });
  };

  addPoint = (id: PointId, data: IPoint) => {
    this.setState(state => ({
      ...state,
      pointsById: {
        ...state.pointsById,
        [id]: data
      }
    }));
  };

  removePoint = (id: PointId) => {
    this.setState(state => {
      const { [id]: removed, ...points } = state.pointsById;
      return {
        ...state,
        pointsById: points
      };
    });
  };

  addControlPoint = (id: ControlPointId, data: IControlPoint) => {
    this.setState(state => ({
      ...state,
      controlPointsById: {
        ...state.controlPointsById,
        [id]: data
      }
    }));
  };

  removeControlPoint = (id: ControlPointId) => {
    this.setState(state => {
      const { [id]: removed, ...controlPoints } = state.controlPointsById;
      return {
        ...state,
        controlPointsById: controlPoints
      };
    });
  };

  updatePathData = (
    pathId: PathId,
    data: Partial<IPath> | ((data: IPath) => IPath)
  ) => {
    this.setState(state => ({
      ...state,
      pathsById: {
        ...state.pathsById,
        [pathId]:
          typeof data === "function"
            ? data(state.pathsById[pathId])
            : {
                ...state.pathsById[pathId],
                ...data
              }
      }
    }));
  };

  updateCurveData = (curveId: CurveId, data: Partial<ICurve>) => {
    this.setState(state => ({
      ...state,
      curvesById: {
        ...state.curvesById,
        [curveId]: {
          ...state.curvesById[curveId],
          ...data
        }
      }
    }));
  };

  updateControlPointPosition = (id: ControlPointId, x: number, y: number) => {
    this.setState(state => ({
      ...state,
      controlPointsById: {
        ...state.controlPointsById,
        [id]: { x, y }
      }
    }));
  };

  dragStart = (pointId: PointId | ControlPointId, x: number, y: number) => {
    const { canvas } = this;
    const { controlPointsById } = this.state;
    const pathId = this.getPathByPoint(pointId);

    this.activePath = pathId;
    this.dragData.dragging = true;
    this.dragData.path = pathId;
    this.dragData.point = pointId;
    this.dragData.isControl = controlPointsById[pointId] !== undefined;
    this.dragData.position = { x, y };

    canvas.style.cursor = "move";
  };

  dragging = (e: MouseEvent) => {
    const { dragData } = this;
    if (dragData.path === null || dragData.point === null) return;

    const pointId = dragData.point as PointId;
    const { x, y } = this.getMouseRelativePosition(e);

    this.setState(state => {
      const { pointsById, controlPointsById } = state;

      const point = dragData.isControl
        ? controlPointsById[pointId]
        : pointsById[pointId];

      if (dragData.isControl) {
        // moving control point
        return {
          ...state,
          controlPointsById: {
            ...controlPointsById,
            [pointId]: { x, y }
          }
        };
      } else {
        // moving point and corresponding control point synchronously
        const idsToMove = this.getControlPointsForPoint(pointId);
        const dx = point.x - x;
        const dy = point.y - y;

        return {
          ...state,
          controlPointsById: this.moveControlPointsBy(
            controlPointsById,
            idsToMove,
            dx,
            dy
          ),
          pointsById: { ...pointsById, [pointId]: { x, y } }
        };
      }
    });
  };

  dragEnd = (e: MouseEvent) => {
    this.dragData = this.clearDragData();
    this.canvas.style.cursor = "default";
  };

  getPathByPoint = (pointId: PointId): PathId | never => {
    const { pathsById } = this.state;
    const res = Object.keys(pathsById).find(pathId => {
      const path = pathsById[pathId];
      return (
        path.points.includes(pointId) || path.controlPoints.includes(pointId)
      );
    });

    if (!res) {
      throw new Error(
        `getPathByPoint: point '${pointId}' doesn't belong to any path`
      );
    }
    return res;
  };

  moveControlPointsBy = (
    points: { [key in ControlPointId]: IControlPoint },
    ids: ControlPointId[],
    dx: number,
    dy: number
  ) => {
    return mapValues(points, (point: IControlPoint, id: ControlPointId) => {
      if (ids.includes(id)) {
        return {
          x: point.x - dx,
          y: point.y - dy
        } as IControlPoint;
      }
      return point;
    });
  };

  getPointUnderCursor = (
    mouseX: number,
    mouseY: number,
    control = false
  ): PointId | undefined => {
    const {
      styleSheet: {
        point: { radius }
      }
    } = this;
    const { pointsById: points, controlPointsById: controlPoints } = this.state;
    const arr = control ? controlPoints : points;

    return Object.keys(arr).find(pointId => {
      const point = arr[pointId];
      const dx = point.x - mouseX;
      const dy = point.y - mouseY;
      return dx * dx + dy * dy < Math.pow(radius, 2);
    });
  };

  getMouseRelativePosition = (e: MouseEvent) => {
    const { canvas } = this;
    const event = e ? e : (window.event as MouseEvent);

    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop
    };
  };

  getControlPointsForPoint = (pointId: PointId): ControlPointId[] => {
    const { curvesById: curves } = this.state;
    return Object.keys(curves).reduce<ControlPointId[]>((acc, curveId) => {
      const curve = curves[curveId];
      if (curve.start.point === pointId) {
        acc.push(curve.start.controlPoint);
      } else if (curve.end !== null && curve.end.point === pointId) {
        acc.push(curve.end.controlPoint);
      }
      return acc;
    }, []);
  };

  clearDragData = () => {
    return {
      dragging: false,
      path: null,
      point: null,
      isControl: null,
      position: null
    };
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <canvas id="canvas" width="600" height="400" />
        </div>
      </div>
    );
  }
}
