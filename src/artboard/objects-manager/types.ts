export type ObjectId = string;

export enum ObjectTypes {
  Path = "Path"
}

export interface IObject<T = any> {
  type: ObjectTypes;
  data: T;
}

export type ObjectsById = { [key in ObjectId]?: IObject };

export type ObjectsByType = { [key in ObjectTypes]?: IObject[] };

export type ObjectsIdsByType = { [key in ObjectTypes]?: ObjectId[] };
