import { Instruments } from "../../../artboard/instruments-panel/types";

export const SET_ACTIVE_INSTRUMENT = "SET_ACTIVE_INSTRUMENT";

export class SetActiveInstrument {
  public readonly type = SET_ACTIVE_INSTRUMENT;
  constructor(public payload: Instruments) {}
}

export type InstrumentsPanelActionType = typeof SET_ACTIVE_INSTRUMENT;

export type InstrumentsPanelActionCreator = typeof SetActiveInstrument;

export type InstrumentsPanelAction = SetActiveInstrument;
