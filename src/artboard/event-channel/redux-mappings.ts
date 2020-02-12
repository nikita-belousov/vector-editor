import { SET_ACTIVE_INSTRUMENT } from "../../ui/model/instruments-panel/actions";
import { InstrumentsEvents } from "../instruments-panel/types";
import { ReduxMappings } from "./types";

export const reduxMappings: ReduxMappings = new Map([
  [SET_ACTIVE_INSTRUMENT, InstrumentsEvents.SetInstrument]
]);
