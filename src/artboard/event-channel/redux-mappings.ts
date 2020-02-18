import { ReduxMappings } from "./types";
import { SET_ACTIVE_INSTRUMENT } from "../../ui/model/instruments-panel/actions";
import {
  ENTER_ARTBOARD,
  LEAVE_ARTBOARD,
  SET_BACKGROUND_COLOR,
  SET_ARTBOARD_WIDTH,
  SET_ARTBOARD_HEIGHT
} from "../../ui/model/artboard/actions";
import {
  SET_STROKE_COLOR,
  SET_STROKE_WIDTH
} from "../../ui/model/object-settings/actions";
import { BackgroundEvents } from "../background/types";
import { InstrumentsEvents } from "../instruments-panel/types";
import { ArtboardEvents } from "../artboard/types";
import { ObjectsEvents } from "../object/types";

export const reduxMappings: ReduxMappings = new Map([
  [SET_ACTIVE_INSTRUMENT, InstrumentsEvents.SetInstrument],
  [ENTER_ARTBOARD, ArtboardEvents.EnterArtboard],
  [LEAVE_ARTBOARD, ArtboardEvents.LeaveArtboard],
  [SET_BACKGROUND_COLOR, BackgroundEvents.SetColor],
  [SET_ARTBOARD_WIDTH, ArtboardEvents.SetWidth],
  [SET_ARTBOARD_HEIGHT, ArtboardEvents.SetHeight],
  [SET_STROKE_COLOR, ObjectsEvents.SetStrokeColor],
  [SET_STROKE_WIDTH, ObjectsEvents.SetStrokeWidth]
]);
