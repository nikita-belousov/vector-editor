import { InstrumentsEvents, Instruments } from "../instruments-panel/types";
import { Entity } from "../entity";
import { ArtboardObject } from "../object";
import { ObjectTypes } from "../object/types";

export abstract class Instrument extends Entity {
  public type!: Instruments;
  protected active = false;

  constructor(type: Instruments) {
    super();
    this.type = type;

    this.eventHandlers = {
      [InstrumentsEvents.SetInstrument]: (instrument: Instruments) => {
        if (instrument === this.type) {
          this.active = true;
          this.handlePick();
        } else if (this.active) {
          this.active = false;
        }
      }
    };
  }

  public abstract objectTypes: ObjectTypes[];

  public abstract getObjects(): ArtboardObject[];

  protected abstract handlePick(): void;
}
