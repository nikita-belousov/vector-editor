export const ENTER_ARTBOARD = "ENTER_ARTBOARD";
export const LEAVE_ARTBOARD = "LEAVE_ARTBOARD";

export class EnterArtboard {
  public readonly type = ENTER_ARTBOARD;
}

export class LeaveArtboard {
  public readonly type = LEAVE_ARTBOARD;
}

export type ArtboardActionType = typeof ENTER_ARTBOARD | typeof LEAVE_ARTBOARD;

export type ArtboardAction = EnterArtboard | LeaveArtboard;
