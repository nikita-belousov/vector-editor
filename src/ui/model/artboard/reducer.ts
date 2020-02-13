import produce from "immer";
import { ArtboardAction, ENTER_ARTBOARD, LEAVE_ARTBOARD } from "./actions";

export interface IArtboardState {
  entered: boolean;
}

const initialState: IArtboardState = {
  entered: false
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
    }
  });
};
