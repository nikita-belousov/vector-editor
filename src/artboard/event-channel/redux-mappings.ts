import { SET_ACTIVE_INSTRUMENT } from "../../ui/model/instruments-panel/actions";
import {
  ENTER_ARTBOARD,
  LEAVE_ARTBOARD
} from "../../ui/model/artboard/actions";
import { InstrumentsEvents } from "../instruments-panel/types";
import { ArtboardEvents } from "../artboard/types";
import { ReduxMappings } from "./types";

export const reduxMappings: ReduxMappings = new Map([
  [SET_ACTIVE_INSTRUMENT, InstrumentsEvents.SetInstrument],
  [ENTER_ARTBOARD, ArtboardEvents.EnterArtboard],
  [LEAVE_ARTBOARD, ArtboardEvents.LeaveArtboard]
]);
