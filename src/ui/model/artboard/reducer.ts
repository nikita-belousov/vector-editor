import produce from "immer";
import {
  ArtboardAction,
  ENTER_ARTBOARD,
  LEAVE_ARTBOARD,
  SET_ARTBOARD_WIDTH,
  SET_ARTBOARD_HEIGHT,
  SET_BACKGROUND_COLOR
} from "./actions";

export interface IArtboardState {
  entered: boolean;
  width: number | null;
  height: number | null;
  backgroundColor: string | null;
}

const initialState: IArtboardState = {
  entered: false,
  width: null,
  height: null,
  backgroundColor: null
};

export const artboardReducer = (
  state: IArtboardState = initialState,
  action: ArtboardAction
) => {
  return produce(state, (draft: IArtboardState) => {
    switch (action.type) {
      case ENTER_ARTBOARD:
        draft.entered = true;
        break;
      case LEAVE_ARTBOARD:
        draft.entered = false;
        break;
      case SET_ARTBOARD_WIDTH:
        draft.width = action.payload;
        break;
      case SET_ARTBOARD_HEIGHT:
        draft.height = action.payload;
        break;
      case SET_BACKGROUND_COLOR:
        draft.backgroundColor = action.payload;
        break;
    }
  });
};
