import uniqueId from "lodash/uniqueId";
import {
  ObjectTypes,
  ObjectId,
  IObject,
  ObjectsById,
  ObjectsByType,
  ObjectsIdsByType
} from "./types";

export class ObjectsManager {
  private byId: ObjectsById = {};
  private idsByType: ObjectsIdsByType = {};

  public getObjectsByTypes(types: ObjectTypes[]): Readonly<ObjectsByType> {
    return types.reduce<ObjectsByType>((acc, type) => {
      const ids = this.idsByType[type];

      if (!ids || ids.length === 0) {
        return acc;
      } else {
        const objs = ids
          .map(id => this.byId[id])
          .filter(obj => obj !== undefined);

        acc[type] = objs as IObject[];
        return acc;
      }
    }, {});
  }

  public addNewObject(type: ObjectTypes, data: IObject): ObjectId {
    const objectId = uniqueId("object__") as ObjectId;

    this.byId[objectId] = { type, data };
    return objectId;
  }

  public updateObject(id: ObjectId, data: IObject) {
    const object = this.byId[id];

    if (object === undefined) {
      throw new Error(`object with id ${id} doesn't exist`);
    } else {
      object.data = data;
    }
  }
}
