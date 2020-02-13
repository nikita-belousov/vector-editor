import produce from "immer";
import { CoreAction, SET_AGE } from "./actions";

export interface ICoreState {
  foo: string;
}

const initialState: ICoreState = {
  foo: "bar"
};

export const coreReducer = (
  state: ICoreState = initialState,
  action: CoreAction
) => {
  return produce(state, (draft: ICoreState) => {
    switch (action.type) {
      case SET_AGE:
        draft.foo = "1";
        break;
    }
  });
};
