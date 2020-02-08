import { Instruments, InstrumentsEvents } from "./types";
import { EmittingEvents } from "../decorators";
import { Entity } from "../entity";

@EmittingEvents([InstrumentsEvents.ChangeInstrument])
export class InstrumentsPanel extends Entity {
  public displayName = "Instruments Panel";
  private activeInstrument!: Instruments;

  constructor() {
    super();

    this.changeActiveInstrument(Instruments.PenTool);
  }

  public getActiveInstrument(): Instruments {
    return this.activeInstrument;
  }

  public changeActiveInstrument(instrument: Instruments) {
    const emitter = this.eventEmitters[InstrumentsEvents.ChangeInstrument];
    emitter(this.getActiveInstrument());
  }
}
