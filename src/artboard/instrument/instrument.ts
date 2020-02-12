import { InstrumentsEvents, Instruments } from "../instruments-panel/types";
import { Entity } from "../entity";
import { ArtboardObject } from "../object";
import { ObjectTypes } from "../object/types";

export abstract class Instrument extends Entity {
  public type!: Instruments;

  constructor(type: Instruments) {
    super();

    this.type = type;
    this.eventHandlers = {
      [InstrumentsEvents.SetInstrument]: (instrument: Instruments) => {
        if (instrument === this.type) {
          this.handlePick();
        }
      }
    };
  }

  public abstract objectTypes: ObjectTypes[];

  public abstract getObjects(): ArtboardObject[];

  public abstract handlePick(): void;
}
