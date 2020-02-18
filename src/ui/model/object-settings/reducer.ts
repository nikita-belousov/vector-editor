import produce from "immer";
import {
  ObjectSettingsAction,
  SET_STROKE_COLOR,
  SET_STROKE_WIDTH
} from "./actions";

export interface IObjectSettingsState {
  stroke: {
    color: string;
    width: number;
  };
}

const initialState: IObjectSettingsState = {
  stroke: {
    color: "#000",
    width: 0
  }
};

export const objectSettingsReducer = (
  state: IObjectSettingsState = initialState,
  action: ObjectSettingsAction
) => {
  return produce(state, (draft: IObjectSettingsState) => {
    switch (action.type) {
      case SET_STROKE_COLOR:
        draft.stroke.color = action.payload;
        break;
      case SET_STROKE_WIDTH:
        draft.stroke.width = action.payload;
        break;
    }
  });
};
