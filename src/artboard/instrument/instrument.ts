import {
  ObjectTypes,
  IObject,
  ObjectId,
  ObjectsByType
} from "../objects-manager/types";
import { ListeningEvents } from "../decorators";
import { InstrumentsEvents, Instruments } from "../instruments-panel/types";
import { RenderableEntity } from "../renderable-entity";
import { IInstrumentConstructorParams } from "./types";

@ListeningEvents([InstrumentsEvents.ChangeInstrument])
export abstract class Instrument extends RenderableEntity {
  public instrument!: Instruments;

  protected getObjects!: (types: ObjectTypes[]) => Readonly<ObjectsByType>;
  protected addNewObject!: (type: ObjectTypes, data: IObject) => void;
  protected updateObject!: (id: ObjectId, data: IObject) => void;

  constructor({
    instrument,
    getObjects,
    onObjectAdd,
    onObjectUpdate
  }: IInstrumentConstructorParams) {
    super();

    this.instrument = instrument;
    this.getObjects = getObjects;
    this.addNewObject = onObjectAdd;
    this.updateObject = onObjectUpdate;

    this.eventHandlers = {
      [InstrumentsEvents.ChangeInstrument]: (instrument: Instruments) => {
        if (instrument === this.instrument) {
          this.handlePick();
        }
      }
    };
  }

  public abstract objectTypes: ObjectTypes[];

  public abstract handlePick(): void;
}
