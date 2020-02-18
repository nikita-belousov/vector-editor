import { ShapeCurve, ShapePoint } from "../pentool/path";
import { controlPoint } from "../pentool/styles";

export const getRectangleCurves = (): ShapeCurve[] => {
  const point1 = new ShapePoint(0, 0);
  const point2 = new ShapePoint(1, 0);
  const point3 = new ShapePoint(1, 1);
  const point4 = new ShapePoint(0, 1);

  const curve1 = new ShapeCurve({
    point1: point1,
    point2: point2,
    control1: point1.copy(),
    control2: point2.copy()
  });
  const curve2 = new ShapeCurve({
    point1: point2,
    point2: point3,
    control1: point2.copy(),
    control2: point3.copy()
  });
  const curve3 = new ShapeCurve({
    point1: point3,
    point2: point4,
    control1: point3.copy(),
    control2: point4.copy()
  });
  const curve4 = new ShapeCurve({
    point1: point4,
    point2: point1,
    control1: point4.copy(),
    control2: point1.copy()
  });

  curve1.next = curve2;
  curve2.previous = curve1;
  curve2.next = curve3;
  curve3.previous = curve2;
  curve3.next = curve4;
  curve4.previous = curve3;

  return [curve1, curve2, curve3, curve4];
};

export const getPolygonCurves = (): ShapeCurve[] => {
  const point1 = new ShapePoint(0, 0.5);
  const point2 = new ShapePoint(1, 1);
  const point3 = new ShapePoint(0, 1);

  const curve1 = new ShapeCurve({
    point1: point1,
    point2: point2,
    control1: point1.copy(),
    control2: point2.copy()
  });
  const curve2 = new ShapeCurve({
    point1: point2,
    point2: point3,
    control1: point2.copy(),
    control2: point3.copy()
  });
  const curve3 = new ShapeCurve({
    point1: point3,
    point2: point1,
    control1: point3.copy(),
    control2: point1.copy()
  });

  return [curve1, curve2, curve3];
};
