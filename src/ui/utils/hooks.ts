import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { AppActionCreator } from "../actions";

export const useAction = (Action: AppActionCreator, deps?: any[]) => {
  const dispatch = useDispatch();

  return useMemo(
    () => {
      return (payload: any) => {
        dispatch(new Action(payload));
      };
    },
    deps ? [dispatch, ...deps] : [dispatch]
  );
};
