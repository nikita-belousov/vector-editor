import { createSelector } from "reselect";
import { IAppState } from "../../reducer";

const getObjectSettings = (state: IAppState) => state.objectSettings;

const getStroke = createSelector(
  getObjectSettings,
  state => state.stroke
);

export const getStrokeColor = createSelector(
  getStroke,
  stroke => stroke.color
);

export const getStrokeWidth = createSelector(
  getStroke,
  stroke => stroke.width
);
