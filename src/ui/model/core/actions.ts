export const SET_NAME = "SET_NAME";
export const SET_AGE = "SET_AGE";

class SetName {
  public readonly type = "SET_NAME";
  constructor(public payload: string) {}
}

class SetAge {
  public readonly type = "SET_AGE";
  constructor(public payload: number) {}
}

export type CoreActionType = typeof SET_NAME | typeof SET_AGE;

export type CoreAction = SetName | SetAge;
