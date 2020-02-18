export const SET_STROKE_COLOR = "SET_STROKE_COLOR";
export const SET_STROKE_WIDTH = "SET_STROKE_WIDTH";

export class SetStrokeColor {
  public readonly type = SET_STROKE_COLOR;
  constructor(public payload: string) {}
}

export class SetStrokeWidth {
  public readonly type = SET_STROKE_WIDTH;
  constructor(public payload: number) {}
}

export type ObjectSettingsType =
  | typeof SET_STROKE_COLOR
  | typeof SET_STROKE_WIDTH;

export type ObjectSettingsAction = SetStrokeColor | SetStrokeWidth;
