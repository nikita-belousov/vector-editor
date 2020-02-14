import { createSelector } from "reselect";
import { IAppState } from "../../reducer";

const getArtboard = (state: IAppState) => state.artboard;

export const getArtboardWidth = createSelector(
  getArtboard,
  artboard => artboard.width
);

export const getArtboardHeight = createSelector(
  getArtboard,
  artboard => artboard.height
);

export const getArtboardBackgroundColor = createSelector(
  getArtboard,
  artboard => artboard.backgroundColor
);
