import {
  ObjectsByType,
  ObjectTypes,
  IObject,
  ObjectId
} from "../objects-manager/types";
import { Instruments } from "../instruments-panel/types";

export interface IInstrumentConstructorParams {
  instrument: Instruments;
  getObjects: (types: ObjectTypes[]) => Readonly<ObjectsByType>;
  onObjectAdd: (type: ObjectTypes, data: IObject) => void;
  onObjectUpdate: (id: ObjectId, data: IObject) => void;
}
