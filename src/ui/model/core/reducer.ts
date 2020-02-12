import produce, { Draft } from "immer";
import { CoreActions, SET_AGE } from "./actions";

export interface ICoreState {
  foo: string;
}

const initialState: ICoreState = {
  foo: "bar"
};

export const coreReducer = (
  state: ICoreState = initialState,
  action: CoreActions
) => {
  return produce(state, draft => {
    switch (action.type) {
      case SET_AGE:
        draft.foo = "1";
        break;
    }
  });
};
