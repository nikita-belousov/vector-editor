import uniqueId from "lodash/uniqueId";
import { ShapePoint } from "./point";
import * as styles from "../styles";
import { IPathSettings } from "../types";

interface ICurveConstructorParams {
  point1: ShapePoint;
  point2: ShapePoint;
  control1: ShapePoint;
  control2: ShapePoint;
}

export class ShapeCurve {
  public id!: string;
  public previous: ShapeCurve | null = null;
  public next: ShapeCurve | null = null;
  public point1!: ShapePoint;
  public point2!: ShapePoint;
  public control1!: ShapePoint;
  public control2!: ShapePoint;
  public control1Moved = false;
  public control2Moved = false;
  public completed = false;
  public curveVisible = true;

  constructor(params: ICurveConstructorParams) {
    this.id = uniqueId("curve__");
    this.previous = previous;
    this.point1 = startPoint;
    this.control1 = startPoint.copy();
    this.point2 = startPoint.copy();
    this.control2 = startPoint.copy();
  }

  public render(params: ICurveRenderParams) {
    const { ctx, settings, index, length, drawing } = params;

    if (settings.strokeWidth !== 0) {
      this.renderStroke(ctx, settings.strokeColor, settings.strokeWidth);
    }

    this.renderContour(ctx);

    if (drawing) {
      this.renderControlLines(ctx, index, length);
    }

    this.renderPoints(ctx);

    if (drawing) {
      this.renderControlPoints(ctx, index, length);
    }
  }

  public moveStartControlPoint(x: number, y: number) {
    this.control1.x = x;
    this.control1.y = y;
  }

  public moveEnvControlPoint(x: number, y: number) {
    this.control2.x = x;
    this.control2.y = y;
  }

  public moveEndPoint(x: number, y: number) {
    this.point2.x = x;
    this.point2.y = y;
  }

  public moveEndControlPoint(x: number, y: number) {
    this.control2.x = x;
    this.control2.y = y;
  }

  private renderStroke(
    ctx: CanvasRenderingContext2D,
    color: string,
    width: number
  ) {
    const {
      curveVisible,
      point1: startPoint,
      control1: startControlPoint,
      point2: endPoint,
      control2: endControlPoint
    } = this;

    if (!curveVisible || !this.completed) return;

    ctx.lineWidth = width;
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.bezierCurveTo(
      startControlPoint.x,
      startControlPoint.y,
      endControlPoint.x,
      endControlPoint.y,
      endPoint.x,
      endPoint.y
    );
    ctx.stroke();
  }

  private renderContour(ctx: CanvasRenderingContext2D) {
    const {
      curveVisible,
      point1: startPoint,
      control1: startControlPoint,
      point2: endPoint,
      control2: endControlPoint
    } = this;

    if (!curveVisible) return;

    ctx.lineWidth = styles.contour.width;
    ctx.strokeStyle = this.completed
      ? styles.contour.color
      : styles.contour.colorPotential;

    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.bezierCurveTo(
      startControlPoint.x,
      startControlPoint.y,
      endControlPoint.x,
      endControlPoint.y,
      endPoint.x,
      endPoint.y
    );
    ctx.stroke();
  }

  private renderControlLines(
    ctx: CanvasRenderingContext2D,
    index: number,
    length: number
  ) {
    if (index < length - 2) return;

    const {
      control1Moved: startModified,
      control2Moved: endModified,
      point1: startPoint,
      control1: startControlPoint,
      point2: endPoint,
      control2: endControlPoint
    } = this;

    ctx.lineWidth = styles.controlLine.width;
    ctx.strokeStyle = styles.controlLine.color;

    ctx.beginPath();

    if (startModified) {
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(startControlPoint.x, startControlPoint.y);
    }
    if (endModified) {
      ctx.moveTo(endPoint.x, endPoint.y);
      ctx.lineTo(endControlPoint.x, endControlPoint.y);
    }

    ctx.stroke();
  }

  private renderPoints(ctx: CanvasRenderingContext2D) {
    const { point1: startPoint, point2: endPoint } = this;

    ctx.lineWidth = styles.point.width;
    ctx.strokeStyle = styles.point.color;
    ctx.fillStyle = styles.point.fill;

    this.renderPoint(ctx, startPoint);
    this.renderPoint(ctx, endPoint);
  }

  private renderControlPoints(
    ctx: CanvasRenderingContext2D,
    index: number,
    length: number
  ) {
    if (index < length - 2) return;

    const {
      control1Moved: startModified,
      control2Moved: endModified,
      control1: startControlPoint,
      control2: endControlPoint
    } = this;

    ctx.fillStyle = styles.controlPoint.fill;

    if (startModified) {
      this.renderControlPoint(ctx, startControlPoint);
    }
    if (endModified) {
      this.renderControlPoint(ctx, endControlPoint);
    }
  }

  private renderPoint(ctx: CanvasRenderingContext2D, point: ShapePoint) {
    ctx.beginPath();
    ctx.arc(
      point.x,
      point.y,
      styles.point.radius,
      styles.point.arc1,
      styles.point.arc2,
      true
    );
    ctx.fill();
    ctx.stroke();
  }

  private renderControlPoint(ctx: CanvasRenderingContext2D, point: ShapePoint) {
    ctx.save();
    ctx.translate(point.x, point.y);
    ctx.rotate((45 * Math.PI) / 180);

    const { stroke, fill, size, strokeWidth } = styles.controlPoint;

    // stroke rect
    ctx.fillStyle = stroke;
    ctx.fillRect(
      -size / 2 - strokeWidth,
      -size / 2 - strokeWidth,
      size + strokeWidth * 2,
      size + strokeWidth * 2
    );

    // fill rect
    ctx.fillStyle = fill;
    ctx.fillRect(-size / 2, -size / 2, size, size);

    ctx.restore();
  }
}
