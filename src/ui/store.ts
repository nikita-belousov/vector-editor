import {
  createStore,
  applyMiddleware,
  compose,
  Middleware,
  Dispatch,
  Action
} from "redux";
import { logger } from "redux-logger";
import { IState, reducer } from "./reducer";
import { AppActionType } from "./actions";

export type AppMiddleware = Middleware<
  {},
  IState,
  Dispatch<Action<AppActionType>>
>;

const composeEnhancers =
  (window as any)._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const actionToPlainObject: AppMiddleware = store => next => action =>
  next({ ...action });

export const configureStore = () =>
  createStore(
    reducer,
    composeEnhancers(applyMiddleware(actionToPlainObject, logger))
  );

export type AppStore = ReturnType<typeof configureStore>;
