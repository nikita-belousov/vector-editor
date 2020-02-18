export const ENTER_ARTBOARD = "ENTER_ARTBOARD";
export const LEAVE_ARTBOARD = "LEAVE_ARTBOARD";
export const SET_ARTBOARD_WIDTH = "SET_ARTBOARD_WIDTH";
export const SET_ARTBOARD_HEIGHT = "SET_ARTBOARD_HEIGHT";
export const SET_BACKGROUND_COLOR = "SET_BACKGROUND_COLOR";

export class EnterArtboard {
  public readonly type = ENTER_ARTBOARD;
}

export class LeaveArtboard {
  public readonly type = LEAVE_ARTBOARD;
}

export class SetArtboardtWidth {
  public readonly type = SET_ARTBOARD_WIDTH;
  constructor(public payload: number) {}
}

export class SetArtboardHeight {
  public readonly type = SET_ARTBOARD_HEIGHT;
  constructor(public payload: number) {}
}

export class SetBackgroundColor {
  public readonly type = SET_BACKGROUND_COLOR;
  constructor(public payload: string) {}
}

export type ArtboardActionType =
  | typeof ENTER_ARTBOARD
  | typeof LEAVE_ARTBOARD
  | typeof SET_ARTBOARD_WIDTH
  | typeof SET_ARTBOARD_HEIGHT
  | typeof SET_BACKGROUND_COLOR;

export type ArtboardActionCreator =
  | typeof EnterArtboard
  | typeof LeaveArtboard
  | typeof SetArtboardtWidth
  | typeof SetArtboardHeight
  | typeof SetBackgroundColor;

export type ArtboardAction =
  | EnterArtboard
  | LeaveArtboard
  | SetArtboardtWidth
  | SetArtboardHeight
  | SetBackgroundColor;
