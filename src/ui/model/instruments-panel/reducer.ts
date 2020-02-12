import produce from "immer";
import { Instruments } from "../../../artboard/instruments-panel/types";
import { InstrumentsPanelAction, SET_ACTIVE_INSTRUMENT } from "./actions";

export interface IInstrumentsPanelState {
  active: Instruments | null;
}

const initialState: IInstrumentsPanelState = {
  active: null
};

export const instrumentsPanelReducer = (
  state: IInstrumentsPanelState = initialState,
  action: InstrumentsPanelAction
) => {
  return produce(state, draft => {
    switch (action.type) {
      case SET_ACTIVE_INSTRUMENT:
        draft.active = action.payload;
        break;
    }
  });
};
