import {
  ObjectsByType,
  ObjectTypes,
  IObject,
  ObjectId
} from "../objects-manager/types";

export enum Instruments {
  Select = "Select",
  PenTool = "PenTool",
  Shape = "Shape"
}

export interface IInstrumentConstructorParams {
  getObjects: (types: ObjectTypes[]) => Readonly<ObjectsByType>;
  onObjectAdd: (type: ObjectTypes, data: IObject) => void;
  onObjectUpdate: (id: ObjectId, data: IObject) => void;
}
