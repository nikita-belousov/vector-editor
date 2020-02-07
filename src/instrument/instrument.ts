import {
  ObjectTypes,
  IObject,
  ObjectId,
  ObjectsByType
} from "../objects-manager/types";
import { DrawingEntity } from "../drawing-entity";
import { IInstrumentConstructorParams } from "./types";

export abstract class Instrument extends DrawingEntity {
  protected getObjects!: (types: ObjectTypes[]) => Readonly<ObjectsByType>;
  protected addNewObject!: (type: ObjectTypes, data: IObject) => void;
  protected updateObject!: (id: ObjectId, data: IObject) => void;

  constructor({
    getObjects,
    onObjectAdd,
    onObjectUpdate
  }: IInstrumentConstructorParams) {
    super();

    this.getObjects = getObjects;
    this.addNewObject = onObjectAdd;
    this.updateObject = onObjectUpdate;
  }

  public abstract objectTypes: ObjectTypes[];

  public abstract handlePick(): void;
}
