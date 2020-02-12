import { Instruments, InstrumentsEvents } from "./types";
import { Entity } from "../entity";

export class InstrumentsPanel extends Entity {
  public displayName = "Instruments Panel";
  public emittingEventsTypes = [InstrumentsEvents.SetInstrument];

  public eventHandlers = {
    [InstrumentsEvents.SetInstrument]: (instrument: Instruments) => {
      this.setActiveInstrument(instrument, false);
    }
  };

  private activeInstrument!: Instruments;

  public getActiveInstrument(): Instruments {
    return this.activeInstrument;
  }

  public setActiveInstrument(instrument: Instruments, emit = true) {
    this.activeInstrument = instrument;
    if (emit) {
      this.emit(InstrumentsEvents.SetInstrument, instrument);
    }
  }
}
