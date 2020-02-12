import { Entity } from "../entity";
import { ArtboardObject } from "../object";
import {
  ObjectEvents,
  ObjectEventsPayload,
  ObjectId,
  ObjectTypes
} from "../object/types";
import { ObjectsById, ObjectsIdsByType, ObjectsByType } from "./types";
import { RendererEvents } from "../renderer/types";

export class ObjectsManager extends Entity {
  public displayName = "Object Manager";
  public emittingEventsTypes = [RendererEvents.RenderObjects];

  private byId: ObjectsById = {};
  private idsByType: ObjectsIdsByType = {};

  constructor() {
    super();
    this.eventHandlers = {
      [ObjectEvents.CreateObject]: this.registerNewObject
    };
  }

  public getObjectsByTypes(types: ObjectTypes[]): Readonly<ObjectsByType> {
    return types.reduce<ObjectsByType>((acc, type) => {
      const ids = this.idsByType[type];

      if (!ids || ids.length === 0) {
        return acc;
      } else {
        const objs = ids
          .map(id => this.byId[id])
          .filter(obj => obj !== undefined);

        acc[type] = objs as ArtboardObject[];
        return acc;
      }
    }, {});
  }

  public registerNewObject({ type, object }: ObjectEventsPayload) {
    const id = object.getId();
    this.byId[id] = object;
    this.idsByType[type].push(id);
  }

  public updateObject(objectId: ObjectId, object: Object) {
    const { byId } = this;
    const updatedObject = byId[objectId];

    const objectIdsToUpdate = Object.keys(byId).reduce<ObjectId[]>(
      (acc, id) => {
        const object = byId[id];
        const overlaps = object.getRect().overlapsWith(updatedObject.getRect());
        if (overlaps) acc.push(id);

        return acc;
      },
      [objectId]
    );
  }
}
